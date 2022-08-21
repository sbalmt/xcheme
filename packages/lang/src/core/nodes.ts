import * as Core from '@xcheme/core';
import * as Parser from '@xcheme/parser';

import * as Records from './records';
import * as Types from './types';

import { Exception } from './exception';

/**
 * Get the corresponding record from the specified node.
 * @param node Source node.
 * @returns Returns the corresponding node record.
 * @throws Throws an error when the given node has no record assigned.
 */
export const getRecord = (node: Types.Node): Types.SymbolRecord => {
  if (!node.data.record) {
    throw new Exception('Node without a record assignment.');
  }
  return node.data.record;
};

/**
 * Determines whether or not the given node is an alias directive.
 * @param node Source node.
 * @returns Returns true when the node is an alias, false otherwise.
 */
export const isAlias = (node: Types.Node): boolean => {
  return Records.isAlias(getRecord(node));
};

/**
 * Determines whether or not the given node has an identity.
 * @param node Source node.
 * @returns Returns the true when the node has an identity, false otherwise.
 */
export const hasIdentity = (node: Types.Node): boolean => {
  return !!node.data.identity || !!node.data.record;
};

/**
 * Get the corresponding identity from the given node.
 * @param node Source node.
 * @returns Returns the corresponding node identity.
 */
export const getIdentity = (node: Types.Node): number => {
  if (node.value === Parser.Nodes.Access) {
    node = node.lowest(Core.NodeDirection.Right)!;
  }
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
 * Get an identifier containing the path for the given nodes.
 * @param nodes Node list.
 * @param separator Path separator.
 * @returns Returns the generated identifier.
 */
export const getPath = (nodes: Types.Node[], separator: string): string => {
  const path = [];
  for (const node of nodes) {
    path.push(node.fragment.data);
  }
  return path.join(separator);
};
