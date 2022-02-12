import * as Core from '@xcheme/core';

import * as Project from '../../core/project';
import * as Entries from '../../core/entries';
import * as Identity from '../../core/nodes/identity';
import * as Parser from '../../parser';
import * as Context from '../context';

import { Errors } from '../../core/errors';

/**
 * Update the specified node for an optimized one after resolving its reference.
 * @param project Project context.
 * @param entry Referenced entry.
 * @param parent Parent node.
 * @param node Reference node.
 * @param direction Node direction.
 */
const updateNode = (
  project: Project.Context,
  entry: Entries.Entry,
  parent: Core.Node,
  node: Core.Node,
  direction: Core.Nodes
): void => {
  if (!entry.dynamic) {
    parent.setChild(direction, new Identity.Node(node, entry.identity));
  } else {
    project.addError(node, Errors.INVALID_MAP_REFERENCE);
  }
};

/**
 * Find and link the corresponding reference for the specified node.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the dependency entry or undefined the dependency isn't ready yet.
 */
const linkReference = (project: Project.Context, node: Core.Node, state: Context.State): Entries.Entry | undefined => {
  const identifier = node.fragment.data;
  const dependency = project.local.get(identifier);
  if (dependency) {
    project.local.on(state.entry.identifier, (entry) => {
      entry.dependencies.push(dependency);
      dependency.dependents.push(entry);
    });
  } else {
    project.local.on(identifier, (dependency) => {
      const entry = project.local.get(state.entry.identifier)!;
      entry.dependencies.push(dependency);
      dependency.dependents.push(entry);
    });
  }
  return dependency;
};

/**
 * Resolve and validate the corresponding reference for the specified symbol and node in a 'SKIP' directive.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 * @param state Consumption state.
 */
const resolveSkip = (project: Project.Context, node: Core.Node, symbol: Core.Record, state: Context.State): void => {
  if (symbol.value === Parser.Symbols.AliasToken) {
    linkReference(project, node, state);
  } else if (symbol.value === Parser.Symbols.Token) {
    project.addError(node, Errors.INVALID_TOKEN_REFERENCE);
  } else if (symbol.value === Parser.Symbols.AliasNode) {
    project.addError(node, Errors.INVALID_ALIAS_NODE_REFERENCE);
  } else if (symbol.value === Parser.Symbols.Node) {
    project.addError(node, Errors.INVALID_NODE_REFERENCE);
  } else {
    project.addError(node, Errors.UNRESOLVED_IDENTIFIER);
  }
};

/**
 * Resolve and validate the corresponding reference for the specified symbol and node in a 'TOKEN' directive.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 * @param state Consumption state.
 */
const resolveToken = (project: Project.Context, node: Core.Node, symbol: Core.Record, state: Context.State): void => {
  if (symbol.value === Parser.Symbols.Token || symbol.value === Parser.Symbols.AliasToken) {
    linkReference(project, node, state);
  } else if (symbol.value === Parser.Symbols.Node) {
    project.addError(node, Errors.INVALID_NODE_REFERENCE);
  } else if (symbol.value === Parser.Symbols.AliasNode) {
    project.addError(node, Errors.INVALID_ALIAS_NODE_REFERENCE);
  } else {
    project.addError(node, Errors.UNRESOLVED_IDENTIFIER);
  }
};

/**
 * Resolve and validate the corresponding reference for the specified symbol and node in a 'NODE' directive.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param symbol Referenced symbol.
 * @param state Consumption state.
 */
const resolveNode = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Core.Node,
  symbol: Core.Record,
  state: Context.State
): void => {
  const node = parent.getChild(direction)!;
  if (symbol.value === Parser.Symbols.Node || symbol.value === Parser.Symbols.AliasNode) {
    linkReference(project, node, state);
  } else if (symbol.value === Parser.Symbols.Token) {
    const dependency = linkReference(project, node, state);
    if (dependency) {
      updateNode(project, dependency, parent, node, direction);
    } else {
      project.local.on(node.fragment.data, (entry: Entries.Entry) => {
        updateNode(project, entry, parent, node, direction);
      });
    }
  } else if (symbol.value === Parser.Symbols.AliasToken) {
    project.addError(node, Errors.INVALID_ALIAS_TOKEN_REFERENCE);
  } else {
    project.addError(node, Errors.UNRESOLVED_IDENTIFIER);
  }
};

/**
 * Consume a child node from the AST on the given parent and optimize the reference pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  const node = parent.getChild(direction)!;
  const identifier = node.fragment.data;
  const symbol = node.table.find(identifier);
  if (!symbol) {
    project.addError(node, Errors.UNDEFINED_IDENTIFIER);
  } else {
    switch (state.entry.type) {
      case Entries.Types.Skip:
        resolveSkip(project, node, symbol, state);
        break;
      case Entries.Types.Token:
        resolveToken(project, node, symbol, state);
        break;
      case Entries.Types.Node:
        resolveNode(project, direction, parent, symbol, state);
        break;
    }
  }
};
