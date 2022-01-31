import * as Core from '@xcheme/core';

import * as Parser from '../parser';

/**
 * Get a new identity node.
 * @param identity Node identity.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the node.
 */
export const getIdentity = (identity: string, table: Core.Table, location: Core.Location): Core.Node => {
  const fragment = new Core.Fragment(identity, 0, identity.length, location);
  const node = new Core.Node(fragment, Parser.Nodes.Identity, table);
  return node;
};

/**
 * Get a new identifier node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the node.
 */
export const getIdentifier = (identifier: string, table: Core.Table, location: Core.Location): Core.Node => {
  const identity = identifier.substring(4);
  const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
  const node = new Core.Node(fragment, Parser.Nodes.Identifier, table);
  const record = new Core.Record(fragment, Parser.Symbols.Token, node);
  node.setChild(Core.Nodes.Left, getIdentity(identity, table, location));
  table.add(record);
  return node;
};

/**
 * Get a new token node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @param expression Node expression.
 * @returns Return the node.
 */
export const getToken = (identifier: string, table: Core.Table, location: Core.Location, expression: Core.Node): Core.Node => {
  const fragment = new Core.Fragment('token', 0, 5, location);
  const node = new Core.Node(fragment, Parser.Nodes.Token, table);
  const ident = getIdentifier(identifier, table, location);
  ident.setChild(Core.Nodes.Right, expression);
  node.setChild(Core.Nodes.Right, ident);
  return node;
};

/**
 * Get a new reference node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the reference node.
 */
export const getReference = (identifier: string, table: Core.Table, location: Core.Location): Core.Node => {
  const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
  const node = new Core.Node(fragment, Parser.Nodes.Reference, table);
  return node;
};
