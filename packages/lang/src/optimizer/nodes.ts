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
  const ident = new Core.Node(fragment, table, Parser.Nodes.Identity);
  return ident;
};

/**
 * Get a new identifier node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the node.
 */
export const getIdentifier = (identifier: string, table: Core.Table, location: Core.Location): Core.Node => {
  const identity = identifier.substr(4);
  const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
  const ident = new Core.Node(fragment, table, Parser.Nodes.Identifier);
  const record = new Core.Record(fragment, ident, Parser.Symbols.Token);
  ident.setChild(Core.Nodes.Left, getIdentity(identity, table, location));
  table.add(record);
  return ident;
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
  const token = new Core.Node(fragment, table, Parser.Nodes.Token);
  const ident = getIdentifier(identifier, table, location);
  ident.setChild(Core.Nodes.Right, expression);
  token.setChild(Core.Nodes.Right, ident);
  return token;
};

/**
 * Get a new reference node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the node.
 */
export const getReference = (identifier: string, table: Core.Table, location: Core.Location): Core.Node => {
  const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
  const reference = new Core.Node(fragment, table, Parser.Nodes.Reference);
  return reference;
};
