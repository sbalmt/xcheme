import * as Core from '@xcheme/core';
import * as Parser from '@xcheme/parser';

import * as Types from '../core/types';

/**
 * Allowed directive types.
 */
export const enum Directives {
  Token = Parser.Nodes.Token,
  Node = Parser.Nodes.Node,
  AliasToken = Parser.Nodes.AliasToken,
  AliasNode = Parser.Nodes.AliasNode
}

/**
 * Get the corresponding record type from the given directive type.
 * @param type Directive type.
 * @returns Returns the corresponding record type.
 */
const getRecordType = (type: Directives): Parser.Symbols => {
  return type + (Parser.Symbols.Token - Parser.Nodes.Token);
};

/**
 * Get a new identity node.
 * @param name Identity name.
 * @param location Fragment location.
 * @param table Active symbol table.
 * @returns Returns the generated node.
 */
const getIdentity = (name: string, location: Core.Location, table: Types.SymbolTable): Types.Node => {
  const fragment = new Core.Fragment(name, 0, name.length, location);
  const argument = new Core.Node<Types.Metadata>(fragment, Parser.Nodes.Arguments, table);
  const identity = new Core.Node<Types.Metadata>(fragment, Parser.Nodes.Identity, table);

  argument.set(Core.NodeDirection.Left, identity);

  return argument;
};

/**
 * Get a new identifier node.
 * @param type Directive type.
 * @param location Fragment location.
 * @param table Active symbol table.
 * @param name Identifier name.
 * @param id Identifier Id.
 * @returns Returns the generated node.
 */
export const getIdentifier = (
  type: Directives,
  location: Core.Location,
  table: Types.SymbolTable,
  name: string,
  id?: string | number
): Types.Node => {
  const fragment = new Core.Fragment(name, 0, name.length, location);
  const identifier = new Core.Node<Types.Metadata>(fragment, Parser.Nodes.Identifier, table);
  const record = new Core.SymbolRecord<Types.Metadata>(fragment, getRecordType(type), identifier);

  if (id !== void 0) {
    const identity = getIdentity(`${id}`, location, table);
    identifier.set(Core.NodeDirection.Left, identity);
  }

  table.insert(record);
  return identifier;
};

/**
 * Get a new directive node.
 * @param type Directive type.
 * @param table Active symbol table.
 * @param identifier Directive identifier.
 * @param expression Directive expression.
 * @returns Return the generated node.
 */
export const getDirective = (
  type: Directives,
  table: Types.SymbolTable,
  identifier: Types.Node,
  expression: Types.Node
): Types.Node => {
  const fragment = new Core.Fragment('directive', 0, 9, identifier.fragment.location);
  const directive = new Core.Node<Types.Metadata>(fragment, type, table);

  directive.set(Core.NodeDirection.Right, identifier);
  identifier.set(Core.NodeDirection.Right, expression);

  return directive;
};

/**
 * Get a new reference node.
 * @param name Reference name.
 * @param location Node location.
 * @param table Active symbol table.
 * @returns Returns the generated node.
 */
export const getReference = (name: string, location: Core.Location, table: Types.SymbolTable): Types.Node => {
  const fragment = new Core.Fragment(name, 0, name.length, location);
  const reference = new Core.Node<Types.Metadata>(fragment, Parser.Nodes.Reference, table);

  return reference;
};
