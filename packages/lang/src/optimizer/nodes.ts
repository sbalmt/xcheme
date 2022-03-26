import type * as Types from '../core/types';

import * as Core from '@xcheme/core';

import * as Parser from '../parser';

/**
 * Get a new identity node.
 * @param identity Node identity.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the generated node.
 */
const getIdentity = (identity: string, table: Types.Table, location: Core.Location): Types.Node => {
  const fragment = new Core.Fragment(identity, 0, identity.length, location);
  const node = new Core.Node<Types.Metadata>(fragment, Parser.Nodes.Identity, table);
  return node;
};

/**
 * Get a new identifier node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the generated node.
 */
const getIdentifier = (identifier: string, table: Types.Table, location: Core.Location): Types.Node => {
  const identity = identifier.substring(4);
  const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
  const node = new Core.Node<Types.Metadata>(fragment, Parser.Nodes.Identifier, table);
  const record = new Core.Record<Types.Metadata>(fragment, Parser.Symbols.Token, node);
  node.set(Core.Nodes.Left, getIdentity(identity, table, location));
  table.add(record);
  return node;
};

/**
 * Get a new TOKEN directive node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @param expression Node expression.
 * @returns Return the generated node.
 */
export const getToken = (
  identifier: string,
  table: Types.Table,
  location: Core.Location,
  expression: Types.Node
): Types.Node => {
  const fragment = new Core.Fragment('token', 0, 5, location);
  const node = new Core.Node<Types.Metadata>(fragment, Parser.Nodes.Token, table);
  const name = getIdentifier(identifier, table, location);
  name.set(Core.Nodes.Right, expression);
  node.set(Core.Nodes.Right, name);
  return node;
};

/**
 * Get a new REFERENCE node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the generated node.
 */
export const getReference = (identifier: string, table: Types.Table, location: Core.Location): Types.Node => {
  const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
  return new Core.Node<Types.Metadata>(fragment, Parser.Nodes.Reference, table);
};
