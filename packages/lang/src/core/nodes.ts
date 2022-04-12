import * as Core from '@xcheme/core';

import * as Symbols from './symbols';
import * as Types from './types';

import { Exception } from './exception';

/**
 * Get the record from the given node.
 * @param node Source node.
 * @returns Returns the node record.
 * @throws Throws an error when the given node has no record.
 */
export const getRecord = (node: Types.Node): Types.Record => {
  if (!node.data.record) {
    throw new Exception('Node without a record assignment.');
  }
  return node.data.record;
};

/**
 * Get the identity from the given node.
 * @param node Source node.
 * @returns Returns the node identity.
 */
export const getIdentity = (node: Types.Node): number => {
  return node.data.identity ?? getRecord(node).data.identity;
};

/**
 * Determines whether or not the given node has a dynamic identity.
 * @param node Source node.
 * @returns Returns true when the node has a dynamic identity, false otherwise.
 */
export const isDynamic = (node: Types.Node): boolean => {
  return getIdentity(node) === Core.Source.Output;
};

/**
 * Determines whether or not the given node has an empty identity.
 * @param node Source node.
 * @returns Returns true when the node identity is empty, false otherwise.
 */
export const isEmpty = (node: Types.Node): boolean => {
  return Number.isNaN(getIdentity(node));
};

/**
 * Determines whether or not the given node is an alias directive.
 * @param node Source node.
 * @returns Returns true when the node is an alias, false otherwise.
 */
export const isAlias = (node: Types.Node): boolean => {
  return Symbols.isAlias(getRecord(node));
};
