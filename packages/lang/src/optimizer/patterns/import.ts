import * as Path from 'path';

import * as Core from '@xcheme/core';

import * as String from '../../core/string';
import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as Lexer from '../../lexer';
import * as Parser from '../../parser';

import { Errors } from '../../core/errors';

import * as Maker from '../../maker';
import * as Optimizer from '../index';

/**
 * Purge from the given record list all dependents that doesn't exists in the specified project context.
 * @param project Project context.
 * @param records Record list.
 */
const purge = (project: Project.Context, records: Core.Record[]): void => {
  for (const record of records) {
    record.data.dependents = record.data.dependents.filter((dependent: Core.Record) => {
      return project.symbols.has(dependent.data.identifier);
    });
    purge(project, record.data.dependencies);
  }
};

/**
 * Import all directives from the given source to the specified project context.
 * @param project Project context.
 * @param node Root node.
 * @param source Source records.
 * @returns Returns an array containing all imported record.
 */
const integrate = (project: Project.Context, node: Core.Node, source: Symbols.Aggregator): Core.Record[] => {
  const list = [];
  for (const record of source) {
    const { identifier, exported } = record.data;
    if (exported) {
      const current = node.table.find(identifier);
      if (current) {
        project.addError(current.node!.fragment, Errors.DUPLICATE_IDENTIFIER);
      } else {
        list.push(record);
        node.table.add(record);
        project.symbols.add(record);
        record.data.exported = false;
        record.data.imported = true;
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
const compile = (project: Project.Context, context: Core.Context, content: string): boolean => {
  return (
    Lexer.consumeText(content, context) &&
    Parser.consumeTokens(context.tokens, context) &&
    Optimizer.consumeNodes(context.node, project) &&
    Maker.consumeNodes(context.node, project)
  );
};

/**
 * Consume the import directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 */
export const consume = (project: Project.Context, node: Core.Node): void => {
  const location = node.right!;
  if (!project.options.loadFileHook) {
    project.addError(location.fragment, Errors.IMPORT_DISABLED);
  } else {
    const file = `${String.extract(location.fragment.data)}.xcm`;
    const path = Path.join(project.options.directory ?? './', file);
    const content = project.options.loadFileHook(path);
    if (!content) {
      project.addError(location.fragment, Errors.IMPORT_NOT_FOUND);
    } else {
      const extContext = new Core.Context(file);
      const extProject = new Project.Context(file, project.coder, {
        ...project.options,
        directory: Path.dirname(path)
      });
      if (compile(extProject, extContext, content)) {
        const records = integrate(project, node, extProject.symbols);
        purge(project, records);
      } else {
        project.addError(location.fragment, Errors.IMPORT_FAILURE);
        project.errors.push(...extProject.errors);
      }
    }
  }
};
