import * as Core from '@xcheme/core';
import * as Parser from '@xcheme/parser';

import * as Symbols from './symbols';
import * as Project from './project';
import * as Types from './types';

/**
 * Determines whether or not the given record is an alias directive.
 * @param record Symbol record.
 * @returns Returns true when the record is an alias, false otherwise.
 */
export const isAlias = (record: Types.SymbolRecord): boolean => {
  return record.value === Parser.Symbols.AliasToken || record.value === Parser.Symbols.AliasNode;
};

/**
 * Determines whether or not the given record has an identity.
 * @param record Symbol record.
 * @returns Returns the true when the record has an identity, false otherwise.
 */
export const hasIdentity = (record: Types.SymbolRecord): boolean => {
  return !!record.data.identity;
};

/**
 * Determines whether or not the given record has a dynamic identity.
 * @param record Symbol record.
 * @returns Returns true when the record has a dynamic identity, false otherwise.
 */
export const isDynamic = (record: Types.SymbolRecord): boolean => {
  return record.data.identity === Core.Source.Output;
};

/**
 * Determines whether or not the given record has an empty identity.
 * @param record Symbol record.
 * @returns Returns true when the record identity is empty, false otherwise.
 */
export const isEmpty = (record: Types.SymbolRecord): boolean => {
  return Number.isNaN(record.data.identity);
};

/**
 * Determines whether or not the given record is a template.
 * @param record Symbol record.
 * @returns Returns true when the record is a template, false otherwise.
 */
export const isTemplate = (record: Types.SymbolRecord): boolean => {
  if (record.table) {
    for (const current of record.table) {
      if (current.value === Parser.Symbols.AliasParameter) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Determines whether or not the given record is referenced.
 * @param record Symbol record.
 * @param types Symbol types.
 * @returns Returns true when the record is referenced, false otherwise.
 * @throws Throws an exception when the given error has no metadata.
 */
export const isReferenced = (record: Types.SymbolRecord, ...types: Types.Directives[]): boolean => {
  const { order, dependents, dependencies } = record.data;
  let counter = 0;
  for (const dependent of dependents) {
    if (counter > 1 || dependent === record || dependencies.includes(dependent)) {
      return true;
    }
    if (types.includes(dependent.data.type)) {
      if (order > dependent.data.order) {
        return true;
      }
      counter++;
    }
  }
  return counter > 1;
};

/**
 * Determines whether or not the given records are from the same location.
 * @param source Source record.
 * @param target Target record.
 * @returns Returns true when both records are from the same location.
 */
export const fromSameLocation = (source: Types.SymbolRecord, target: Types.SymbolRecord): boolean => {
  return source.fragment.location.name === target.fragment.location.name;
};

/**
 * Resolve the symbol record assignment before using it.
 * @param project Project context.
 * @param identifier Target identifier.
 * @param record Symbol record.
 * @param callback Callback for using the record.
 */
export const resolve = (
  project: Project.Context,
  identifier: string,
  record: Types.SymbolRecord,
  callback: Symbols.EventCallback
): void => {
  if (!record.assigned) {
    project.symbols.listen(identifier, callback);
  } else {
    callback(record);
  }
};

/**
 * Connect the given source as a dependency of the target and the given target as a dependent of the source.
 * @param project Project context.
 * @param identifier Target identifier.
 * @param source Target record.
 * @param target Source record.
 */
export const connect = (source: Types.SymbolRecord, target: Types.SymbolRecord): void => {
  if (!target.data.dependencies.includes(source)) {
    target.data.dependencies.push(source);
    source.data.dependents.push(target);
  }
};
