import * as Path from 'path';

import * as Core from '@xcheme/core';

import * as String from '../../core/string';
import * as Project from '../../core/project';
import * as Entries from '../../core/entries';
import * as Lexer from '../../lexer';
import * as Parser from '../../parser';

import { Errors } from '../../core/errors';

import * as Maker from '../../maker';
import * as Optimizer from '../index';

/**
 * Get the corresponding symbol type for the given input entry.
 * @param entry Input entry.
 * @returns Returns the symbol type.
 * @throws Throws an exception when the given entry doesn't match any valid symbol type.
 */
const getSymbolType = (entry: Entries.Entry): Parser.Symbols => {
  if (entry.type === Entries.Types.Node) {
    return entry.alias ? Parser.Symbols.AliasNode : Parser.Symbols.Node;
  } else if (entry.type === Entries.Types.Token) {
    return entry.alias ? Parser.Symbols.AliasToken : Parser.Symbols.Token;
  } else {
    throw `Unexpected entry type (${entry.type}).`;
  }
};

/**
 * Assign all dependencies from the given source to the target aggregator.
 * @param target Target aggregator.
 * @param source Source entries.
 */
const assignDependencies = (target: Project.AggregatorMap, source: Entries.Entry[]): void => {
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
const importDirectives = (project: Project.Context, node: Core.Node, target: Entries.Aggregator, source: Entries.Aggregator): void => {
  for (const entry of source.exports) {
    const identifier = entry.identifier;
    const record = node.table.find(identifier);
    if (record) {
      project.addError(record.node!, Errors.DUPLICATE_IDENTIFIER);
    } else {
      const { type, origin, identity } = entry;
      const location = node.fragment.location;
      const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
      node.table.add(new Core.Record(fragment, getSymbolType(entry), node));
      target.create(type, origin, identifier, identity, { ...entry, imported: true, exported: false });
      assignDependencies(project.external, entry.dependencies);
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
const compile = (project: Project.Context, context: Core.Context, content: string): boolean => {
  return (
    Lexer.consumeText(content, context) &&
    Parser.consumeTokens(context.tokens, context) &&
    Optimizer.consumeNodes(context.node, project) &&
    Maker.consumeNodes(context.node, project)
  );
};

/**
 * Resolve the import directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 */
export const resolve = (project: Project.Context, node: Core.Node): void => {
  const location = node.right!;
  if (!project.options.loadFileHook) {
    project.addError(location, Errors.IMPORT_DISABLED);
  } else {
    const file = `${String.extract(location.fragment.data)}.xcm`;
    const path = Path.join(project.options.rootPath ?? './', file);
    const content = project.options.loadFileHook(path);
    if (!content) {
      project.addError(location, Errors.IMPORT_NOT_FOUND);
    } else {
      const extContext = new Core.Context(file);
      const extProject = new Project.Context(file, project.coder, {
        ...project.options,
        rootPath: Path.dirname(path)
      });
      if (compile(extProject, extContext, content)) {
        importDirectives(project, node, project.local, extProject.local);
      } else {
        project.addError(location, Errors.IMPORT_FAILURE);
        project.errors.push(...extProject.errors);
      }
    }
  }
};
