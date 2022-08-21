import * as Path from 'path';

import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';
import * as Parser from '@xcheme/parser';

import * as String from '../../core/string';
import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as Types from '../../core/types';

import * as Maker from '../../maker';
import * as Cache from '../cache';
import * as Optimizer from '../index';

import { Errors } from '../../core/errors';

/**
 * Cache of processed files.
 */
const processedFiles = new Cache.Context<string, Project.Context>();

/**
 * Cache of files in the current importation step.
 */
const importingFiles = new Cache.Context<string>();

/**
 * Get all the exported records from the given source.
 * @param source Source records aggregator.
 * @returns Returns an array containing all the exported records.
 */
const getExportedRecords = (source: Symbols.Aggregator): Types.SymbolRecord[] => {
  const exported = [];
  for (const record of source) {
    if (record.data.exported) {
      exported.push(record);
    }
  }
  return exported;
};

/**
 * Get all the records that are not in use (referenced) in the specified record list.
 * @param records Record list.
 * @returns Returns a new record set containing all the unused records.
 */
const getUnreferencedRecords = (records: Types.SymbolRecord[]): WeakSet<Types.SymbolRecord> => {
  const unused = new WeakSet<Types.SymbolRecord>();
  const cache = new WeakSet<Types.SymbolRecord>();
  const action = (records: Types.SymbolRecord[]): void => {
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
 * Purge from the specified record list all the dependent records that doesn't exists in the ignored record set.
 * @param records Record list.
 * @param ignored Ignored record set.
 */
const purgeRecords = (records: Types.SymbolRecord[], ignored: WeakSet<Types.SymbolRecord>): void => {
  for (const record of records) {
    const data = record.data;
    data.dependents = data.dependents.filter((dependent) => !ignored.has(dependent));
  }
};

/**
 * Integrate all the exported directives from the given source into the current project.
 * @param project Project context.
 * @param table Global symbol table.
 * @param source Source records aggregator.
 */
const integrate = (project: Project.Context, table: Types.SymbolTable, source: Symbols.Aggregator): void => {
  for (const record of source) {
    const { identifier, exported } = record.data;
    if (exported) {
      const current = table.find(identifier);
      if (current) {
        project.errors.emplace(current.fragment, Errors.DUPLICATE_IDENTIFIER);
      } else {
        const integration = new Core.SymbolRecord(record.fragment, record.value, record.node, record.table);
        integration.assign({ ...record.data, exported: false, imported: true });
        project.symbols.add(integration);
        table.insert(integration);
      }
    }
  }
};

/**
 * Compile the given source content for the specified project and context.
 * @param project Project context.
 * @param context Source context.
 * @param content Source input.
 * @returns Returns true when the compilation was successful, false otherwise.
 */
const compile = (project: Project.Context, context: Types.Context, content: string): boolean => {
  return (
    Lexer.consumeText(content, context) &&
    Parser.consumeTokens(context.tokens, context) &&
    Optimizer.consumeNodes(project, context.node) &&
    Maker.consumeNodes(project, context.node)
  );
};

/**
 * Process the importation content based on the given parameters.
 * @param project Project context.
 * @param location Import location.
 * @param table Global symbol table.
 * @param path Full importation path.
 * @param content Imported content.
 */
const process = (
  project: Project.Context,
  location: Types.Node,
  table: Types.SymbolTable,
  path: string,
  content: string
): void => {
  const directory = Path.dirname(path);
  const external = new Project.Context(path, project.coder, { ...project.options, directory });
  const context = new Core.Context<Types.Metadata>(path);
  importingFiles.add(project.coder, path);
  if (!compile(external, context, content)) {
    project.errors.emplace(location.fragment, Errors.IMPORT_FAILURE);
    project.errors.insert(...external.errors);
  } else {
    const exported = getExportedRecords(external.symbols);
    const unreferenced = getUnreferencedRecords(exported);
    purgeRecords(exported, unreferenced);
    integrate(project, table, external.symbols);
    processedFiles.add(project.coder, path, external);
  }
  importingFiles.delete(project.coder, path);
};

/**
 * Resolve the given IMPORT location pattern and process the importation.
 * @param project Project context.
 * @param location Import location.
 * @param table Global symbol table.
 * @param path Full importation path.
 */
const resolve = (project: Project.Context, location: Types.Node, table: Types.SymbolTable, path: string): void => {
  if (importingFiles.has(project.coder, path)) {
    project.errors.emplace(location.fragment, Errors.IMPORT_CYCLIC);
  } else {
    const content = project.options.loadFileHook!(path);
    if (!content) {
      project.errors.emplace(location.fragment, Errors.IMPORT_NOT_FOUND);
    } else {
      process(project, location, table, path, content);
    }
  }
};

/**
 * Consume the given node, optimize the IMPORT pattern and process the importation.
 * @param project Project context.
 * @param node Import node.
 */
export const consume = (project: Project.Context, node: Types.Node): void => {
  const location = node.right!;
  if (!project.options.loadFileHook) {
    project.errors.emplace(location.fragment, Errors.IMPORT_DISABLED);
  } else {
    const filePath = `${String.extract(location.fragment.data)}.xcm`;
    const fullPath = Path.join(project.options.directory ?? '', filePath);
    const external = processedFiles.get(project.coder, fullPath);
    if (external) {
      integrate(project, node.table, external.symbols);
    } else {
      resolve(project, location, node.table, fullPath);
    }
  }
};
