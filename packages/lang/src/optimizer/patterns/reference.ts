import * as Core from '@xcheme/core';

import * as Project from '../../core/project';
import * as Entries from '../../core/entries';
import * as Identity from '../../core/nodes/identity';
import * as Parser from '../../parser';
import * as Context from '../context';

import { Errors } from '../../core/errors';

/**
 * Validate the corresponding reference for the specified symbol and node in a 'SKIP' directive.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 */
const resolveSkip = (project: Project.Context, node: Core.Node, symbol: Core.Record, state: Context.State): void => {
  if (symbol.value !== Parser.Symbols.AliasToken) {
    if (symbol.value === Parser.Symbols.Token) {
      project.addError(node, Errors.INVALID_TOKEN_REFERENCE);
    } else if (symbol.value === Parser.Symbols.Node) {
      project.addError(node, Errors.INVALID_NODE_REFERENCE);
    } else if (symbol.value === Parser.Symbols.AliasNode) {
      project.addError(node, Errors.INVALID_ALIAS_NODE_REFERENCE);
    } else {
      project.addError(node, Errors.UNRESOLVED_IDENTIFIER);
    }
  } else {
    const identifier = node.fragment.data;
    const entry = project.local.get(identifier);
    if (entry) {
      state.entry.dependencies.push(entry);
      entry.references++;
    } else {
      project.local.on(identifier, (entry: Entries.Entry) => {
        state.entry.dependencies.push(entry);
        entry.references++;
      });
    }
  }
};

/**
 * Resolve and validate the corresponding reference for the specified symbol and node in a 'TOKEN' directive.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 */
const resolveToken = (project: Project.Context, node: Core.Node, symbol: Core.Record, state: Context.State): void => {
  if (symbol.value !== Parser.Symbols.Token && symbol.value !== Parser.Symbols.AliasToken) {
    if (symbol.value === Parser.Symbols.Node) {
      project.addError(node, Errors.INVALID_NODE_REFERENCE);
    } else if (symbol.value === Parser.Symbols.AliasNode) {
      project.addError(node, Errors.INVALID_ALIAS_NODE_REFERENCE);
    } else {
      project.addError(node, Errors.UNRESOLVED_IDENTIFIER);
    }
  } else {
    const identifier = node.fragment.data;
    const entry = project.local.get(identifier);
    if (entry) {
      state.entry.dependencies.push(entry);
      entry.references++;
    } else {
      project.local.on(identifier, (entry: Entries.Entry) => {
        state.entry.dependencies.push(entry);
        entry.references++;
      });
    }
  }
};

/**
 * Resolve and validate the corresponding reference for the specified symbol and node in a 'NODE' directive.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param symbol Referenced symbol.
 */
const resolveNode = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Core.Node,
  symbol: Core.Record,
  state: Context.State
): void => {
  const node = parent.getChild(direction)!;
  const identifier = node.fragment.data;
  if (symbol.value === Parser.Symbols.Node || symbol.value === Parser.Symbols.AliasNode) {
    const entry = project.local.get(identifier);
    if (entry) {
      state.entry.dependencies.push(entry);
      entry.references++;
    } else {
      project.local.on(identifier, (entry: Entries.Entry) => {
        state.entry.dependencies.push(entry);
        entry.references++;
      });
    }
  } else if (symbol.value === Parser.Symbols.Token) {
    const entry = project.local.get(identifier);
    if (entry) {
      state.entry.dependencies.push(entry);
      entry.references++;
      // TODO: Check these lines below.
      if (!entry.dynamic) {
        parent.setChild(direction, new Identity.Node(node, entry.identity));
      } else {
        project.addError(node, Errors.INVALID_MAP_REFERENCE);
      }
    } else {
      project.local.on(identifier, (entry: Entries.Entry) => {
        state.entry.dependencies.push(entry);
        entry.references++;
        // TODO: Check these lines below.
        if (!entry.dynamic) {
          parent.setChild(direction, new Identity.Node(node, entry.identity));
        } else {
          project.addError(node, Errors.INVALID_MAP_REFERENCE);
        }
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
