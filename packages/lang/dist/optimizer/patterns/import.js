"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Path = require("path");
const Core = require("@xcheme/core");
const String = require("../../core/string");
const Project = require("../../core/project");
const Lexer = require("../../lexer");
const Parser = require("../../parser");
const Maker = require("../../maker");
const Optimizer = require("../index");
/**
 * Purge from the given record list all dependents that doesn't exists in the specified project context.
 * @param project Project context.
 * @param records Record list.
 */
const purge = (project, records) => {
    for (const current of records) {
        current.data.dependents = current.data.dependents.filter((dependent) => {
            return project.symbols.has(dependent.data.identifier);
        });
        purge(project, current.data.dependencies);
    }
};
/**
 * Import all directives from the given source to the specified project context.
 * @param project Project context.
 * @param node Root node.
 * @param source Source records.
 * @returns Returns an array containing all imported record.
 */
const integrate = (project, node, source) => {
    const list = [];
    for (const current of source) {
        const { identifier, exported } = current.data;
        if (exported) {
            const record = node.table.find(identifier);
            if (record) {
                project.addError(record.node.fragment, 4096 /* DUPLICATE_IDENTIFIER */);
            }
            else {
                list.push(current);
                node.table.add(current);
                project.symbols.add(current);
                current.data.exported = false;
                current.data.imported = true;
            }
        }
    }
    return list;
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
 * Consume the import directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 */
const consume = (project, node) => {
    const location = node.right;
    if (!project.options.loadFileHook) {
        project.addError(location.fragment, 4117 /* IMPORT_DISABLED */);
    }
    else {
        const file = `${String.extract(location.fragment.data)}.xcm`;
        const path = Path.join(project.options.directory ?? './', file);
        const content = project.options.loadFileHook(path);
        if (!content) {
            project.addError(location.fragment, 4118 /* IMPORT_NOT_FOUND */);
        }
        else {
            const extContext = new Core.Context(file);
            const extProject = new Project.Context(file, project.coder, {
                ...project.options,
                directory: Path.dirname(path)
            });
            if (compile(extProject, extContext, content)) {
                const records = integrate(project, node, extProject.symbols);
                purge(project, records);
            }
            else {
                project.addError(location.fragment, 4119 /* IMPORT_FAILURE */);
                project.errors.push(...extProject.errors);
            }
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=import.js.map