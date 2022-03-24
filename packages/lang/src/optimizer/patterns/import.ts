import * as Path from 'path';

import * as Core from '@xcheme/core';

import * as String from '../../core/string';
import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as Lexer from '../../lexer';
import * as Parser from '../../parser';
import * as Maker from '../../maker';
import * as Cache from '../cache';
import * as Optimizer from '../index';

import { Errors } from '../../core/errors';

/**
 * Cache of imported files.
 */
const cache = new Cache.Context<string>();

/**
 * Purge from the specified record list all the dependent records that's not in use.
 * @param records Record list.
 * @param unused Unused record set.
 */
const purge = (records: Core.Record[], unused: WeakSet<Core.Record>): void => {
  for (const record of records) {
    const { dependents, dependencies } = record.data;
    record.data.dependents = dependents.filter((dependent: Core.Record) => !unused.has(dependent));
    purge(dependencies, unused);
  }
};

/**
 * Collect all the records that's not in use from the specified record list.
 * @param records Record list.
 * @returns Returns the unused record set.
 */
const collect = (records: Core.Record[]): WeakSet<Core.Record> => {
  const unused = new WeakSet<Core.Record>();
  const cache = new WeakSet<Core.Record>();
  const action = (records: Core.Record[]): void => {
    for (const record of records) {
      if (!cache.has(record)) {
        const { dependents, dependencies } = record.data;
        for (const dependent of dependents) {
          if (!cache.has(dependent)) {
            unused.add(dependent);
          }
        }
        cache.add(record);
        unused.delete(record);
        action(dependencies);
      }
    }
  };
  action(records);
  return unused;
};

/**
 * Integrate all directives from the given source into the specified project context.
 * @param project Project context.
 * @param table Root symbol table.
 * @param source Source records.
 * @returns Returns an array containing all imported record.
 */
const integrate = (project: Project.Context, table: Core.Table, source: Symbols.Aggregator): Core.Record[] => {
  const list = [];
  for (const record of source) {
    const { identifier, exported } = record.data;
    if (exported) {
      const current = table.find(identifier);
      if (current) {
        project.addError(current.fragment, Errors.DUPLICATE_IDENTIFIER);
      } else {
        list.push(record);
        table.add(record);
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
 * Consume the IMPORT directive in the given node and replace it by an optimized one.
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
    if (cache.has(project.coder, path)) {
      project.addError(location.fragment, Errors.IMPORT_CYCLIC);
    } else {
      const content = project.options.loadFileHook(path);
      if (!content) {
        project.addError(location.fragment, Errors.IMPORT_NOT_FOUND);
      } else {
        const extContext = new Core.Context(file);
        const extProject = new Project.Context(file, project.coder, {
          ...project.options,
          directory: Path.dirname(path)
        });
        cache.add(project.coder, path);
        if (compile(extProject, extContext, content)) {
          const records = integrate(project, node.table, extProject.symbols);
          const removal = collect(records);
          purge(records, removal);
        } else {
          project.addError(location.fragment, Errors.IMPORT_FAILURE);
          project.errors.push(...extProject.errors);
        }
      }
    }
  }
};
