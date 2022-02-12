"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = void 0;
const Path = require("path");
const Core = require("@xcheme/core");
const String = require("../../core/string");
const Project = require("../../core/project");
const Entries = require("../../core/entries");
const Lexer = require("../../lexer");
const Parser = require("../../parser");
const Maker = require("../../maker");
const Optimizer = require("../index");
/**
 * Get the corresponding symbol type for the given input entry.
 * @param entry Input entry.
 * @returns Returns the symbol type.
 * @throws Throws an exception when the given entry doesn't match any valid symbol type.
 */
const getSymbolType = (entry) => {
    if (entry.type === 3 /* Node */) {
        return entry.alias ? 302 /* AliasNode */ : 301 /* Node */;
    }
    else if (entry.type === 2 /* Token */) {
        return entry.alias ? 303 /* AliasToken */ : 300 /* Token */;
    }
    else {
        throw `Unexpected entry type (${entry.type}).`;
    }
};
/**
 * Assign all dependencies from the given source to the target aggregator.
 * @param target Target aggregator.
 * @param source Source entries.
 */
const assignDependencies = (target, source) => {
    for (const entry of source) {
        const { location } = entry;
        if (!target[location]) {
            target[location] = new Entries.Aggregator('I', location);
        }
        if (!target[location].has(entry.identifier)) {
            target[location].add(entry);
            assignDependencies(target, entry.dependencies);
        }
    }
};
/**
 * Import all directives from the given source to the target.
 * @param project Project context.
 * @param node Root node.
 * @param target Target aggregator.
 * @param source Source aggregator.
 */
const importDirectives = (project, node, target, source) => {
    for (const entry of source.all) {
        if (entry.exported) {
            const identifier = entry.identifier;
            const record = node.table.find(identifier);
            if (record) {
                project.addError(record.node, 4096 /* DUPLICATE_IDENTIFIER */);
            }
            else {
                const { type, origin, identity } = entry;
                const location = node.fragment.location;
                const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
                node.table.add(new Core.Record(fragment, getSymbolType(entry), node));
                target.create(type, origin, identifier, identity, { ...entry, imported: true, exported: false });
                assignDependencies(project.external, entry.dependencies);
            }
        }
    }
};
/**
 * Compile the given source for the specified project.
 * @param project Project context.
 * @param context Source context.
 * @param content Source input.
 * @returns Returns true when the compilation was successful, false otherwise.
 */
const compile = (project, context, content) => {
    return (Lexer.consumeText(content, context) &&
        Parser.consumeTokens(context.tokens, context) &&
        Optimizer.consumeNodes(context.node, project) &&
        Maker.consumeNodes(context.node, project));
};
/**
 * Resolve the import directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 */
const resolve = (project, node) => {
    const location = node.right;
    if (!project.options.loadFileHook) {
        project.addError(location, 4117 /* IMPORT_DISABLED */);
    }
    else {
        const file = `${String.extract(location.fragment.data)}.xcm`;
        const path = Path.join(project.options.rootPath ?? './', file);
        const content = project.options.loadFileHook(path);
        if (!content) {
            project.addError(location, 4118 /* IMPORT_NOT_FOUND */);
        }
        else {
            const extContext = new Core.Context(file);
            const extProject = new Project.Context(file, project.coder, {
                ...project.options,
                rootPath: Path.dirname(path)
            });
            if (compile(extProject, extContext, content)) {
                importDirectives(project, node, project.local, extProject.local);
            }
            else {
                project.addError(location, 4119 /* IMPORT_FAILURE */);
                project.errors.push(...extProject.errors);
            }
        }
    }
};
exports.resolve = resolve;
//# sourceMappingURL=import.js.map