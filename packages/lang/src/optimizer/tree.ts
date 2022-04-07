import * as Core from '@xcheme/core';

import type * as Types from '../core/types';

import * as Parser from '../parser';

import { Exception } from '../core/exception';

/**
 * Get the corresponding record type from the given node type.
 * @param value Node type.
 * @returns Returns the corresponding record type.
 */
const getRecordType = (
  type: Parser.Nodes.Token | Parser.Nodes.Node | Parser.Nodes.AliasToken | Parser.Nodes.AliasNode
): Parser.Symbols => {
  switch (type) {
    case Parser.Nodes.Token:
      return Parser.Symbols.Token;
    case Parser.Nodes.Node:
      return Parser.Symbols.Node;
    case Parser.Nodes.AliasToken:
      return Parser.Symbols.AliasToken;
    case Parser.Nodes.AliasNode:
      return Parser.Symbols.AliasNode;
    default:
      throw new Exception(`Unsupported node type '${type}'.`);
  }
};

/**
 * Get a new identity node.
 * @param identity Node identity.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the generated node.
 */
const getIdentity = (identity: string, table: Types.Table, location: Core.Location): Types.Node => {
  const fragment = new Core.Fragment(identity, 0, identity.length, location);
  const argument = new Core.Node<Types.Metadata>(fragment, Parser.Nodes.Arguments, table);
  const first = new Core.Node<Types.Metadata>(fragment, Parser.Nodes.Identity, table);
  argument.set(Core.Nodes.Left, first);
  return argument;
};

/**
 * Get a new identifier node.
 * @param type Directive type.
 * @param identifier Identifier name.
 * @param identity Identifier identity.
 * @param table Identifier symbol table.
 * @param location Identifier location.
 * @returns Returns the generated identifier node.
 */
export const getIdentifier = (
  type: Parser.Nodes.Token | Parser.Nodes.Node | Parser.Nodes.AliasToken | Parser.Nodes.AliasNode,
  identifier: string,
  identity: string | number | undefined,
  table: Types.Table,
  location: Core.Location
): Types.Node => {
  const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
  const node = new Core.Node<Types.Metadata>(fragment, Parser.Nodes.Identifier, table);
  const record = new Core.Record<Types.Metadata>(fragment, getRecordType(type), node);
  if (identity !== void 0) {
    node.set(Core.Nodes.Left, getIdentity(identity.toString(), table, location));
  }
  table.add(record);
  return node;
};

/**
 * Get a new directive node.
 * @param type Directive type.
 * @param table Directive symbol table.
 * @param identifier Directive identifier.
 * @param expression Directive expression.
 * @returns Return the generated directive node.
 */
export const getDirective = (
  type: Parser.Nodes.Token | Parser.Nodes.Node | Parser.Nodes.AliasToken | Parser.Nodes.AliasNode,
  table: Types.Table,
  identifier: Types.Node,
  expression: Types.Node
): Types.Node => {
  const fragment = new Core.Fragment('directive', 0, 9, identifier.fragment.location);
  const node = new Core.Node<Types.Metadata>(fragment, type, table);
  identifier.set(Core.Nodes.Right, expression);
  node.set(Core.Nodes.Right, identifier);
  return node;
};

/**
 * Get a new reference node.
 * @param identifier Node identifier.
 * @param table Node symbol table.
 * @param location Node location.
 * @returns Returns the generated reference node.
 */
export const getReference = (identifier: string, table: Types.Table, location: Core.Location): Types.Node => {
  const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
  return new Core.Node<Types.Metadata>(fragment, Parser.Nodes.Reference, table);
};
