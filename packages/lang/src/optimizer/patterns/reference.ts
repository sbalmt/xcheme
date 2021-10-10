import * as Core from '@xcheme/core';

import * as Project from '../../core/project';
import * as Entries from '../../core/entries';
import * as Identity from '../../core/nodes/identity';
import * as Parser from '../../parser';
import * as Context from '../context';

import { Errors } from '../../core/errors';

/**
 * Validate the corresponding reference for the specified symbol in a 'SKIP' directive.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param symbol Referenced symbol.
 */
const resolveSkip = (project: Project.Context, node: Core.Node, symbol: Core.Record): void => {
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
    const entry = project.tokenEntries.get(identifier);
    if (entry !== void 0) {
      entry.references++;
    } else {
      project.tokenEntries.on(identifier, (entry: Entries.Entry) => {
        entry.references++;
      });
    }
  }
};

/**
 * Resolve the corresponding reference for the specified symbol in a 'TOKEN' directive.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Project context.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Referenced symbol.
 */
const resolveToken = (project: Project.Context, node: Core.Node, state: Context.State, symbol: Core.Record): void => {
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
    const entry = project.tokenEntries.get(identifier);
    if (entry !== void 0) {
      entry.references++;
      if (entry.dynamic) {
        state.entry.dynamic = true;
      }
    } else {
      project.tokenEntries.on(identifier, (entry: Entries.Entry) => {
        entry.references++;
        if (state.entry.identifier !== identifier && entry.dynamic) {
          project.tokenEntries.get(state.entry.identifier)!.dynamic = true;
        }
      });
    }
  }
};

/**
 * Resolve the corresponding reference for the specified symbol in a 'NODE' directive.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 * @param symbol Referenced symbol.
 */
const resolveNode = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Core.Node,
  state: Context.State,
  symbol: Core.Record
): void => {
  const node = parent.getChild(direction)!;
  const identifier = node.fragment.data;
  if (symbol.value === Parser.Symbols.Node || symbol.value === Parser.Symbols.AliasNode) {
    const entry = project.nodeEntries.get(identifier);
    if (entry !== void 0) {
      entry.references++;
      if (entry.dynamic) {
        state.entry.dynamic = true;
      }
    } else {
      project.nodeEntries.on(identifier, (entry: Entries.Entry) => {
        entry.references++;
        if (state.entry.identifier !== identifier && entry.dynamic) {
          project.nodeEntries.get(state.entry.identifier)!.dynamic = true;
        }
      });
    }
  } else if (symbol.value === Parser.Symbols.Token) {
    const entry = project.tokenEntries.get(identifier);
    if (entry !== void 0) {
      entry.references++;
      if (!entry.dynamic) {
        parent.setChild(direction, new Identity.Node(node, entry.identity));
      } else {
        project.addError(node, Errors.INVALID_MAP_REFERENCE);
      }
    } else {
      project.tokenEntries.on(identifier, (entry: Entries.Entry) => {
        entry.references++;
        if (state.entry.identifier !== identifier) {
          parent.setChild(direction, new Identity.Node(node, entry.identity));
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
  if (symbol === void 0) {
    project.addError(node, Errors.UNDEFINED_IDENTIFIER);
  } else {
    switch (state.type) {
      case Context.Types.Skip:
        resolveSkip(project, node, symbol);
        break;
      case Context.Types.Token:
        resolveToken(project, node, state, symbol);
        break;
      case Context.Types.Node:
        resolveNode(project, direction, parent, state, symbol);
        break;
    }
  }
};
