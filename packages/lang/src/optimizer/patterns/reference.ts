import * as Core from '@xcheme/core';

import * as Parser from '../../parser';
import * as Identity from '../nodes/identity';
import * as Context from '../context';

import { Errors } from '../../core/errors';
import { Project } from '../../core/project';

/**
 * Resolve the corresponding reference for the specified symbol in a 'TOKEN' pattern context.
 * REMARKS: Tokens can only accept tokens and alias tokens references.
 * @param project Input project.
 * @param node Input node.
 * @param symbol Input symbol.
 */
const resolveToken = (project: Project, node: Core.Node, symbol: Core.Record): void => {
  if (symbol.value !== Parser.Symbols.Token && symbol.value !== Parser.Symbols.AliasToken) {
    if (symbol.value === Parser.Symbols.Node) {
      project.errors.push(new Core.Error(node.fragment, Errors.INVALID_NODE_REFERENCE));
    } else if (symbol.value === Parser.Symbols.AliasNode) {
      project.errors.push(new Core.Error(node.fragment, Errors.INVALID_ALIAS_NODE_REFERENCE));
    } else {
      project.errors.push(new Core.Error(node.fragment, Errors.UNRESOLVED_IDENTIFIER));
    }
  }
};

/**
 * Resolve the corresponding reference for the specified symbol in a 'NODE' pattern context.
 * REMARKS: Nodes can only accept tokens, nodes and alias nodes references.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 */
const resolveNode = (project: Project, direction: Core.Nodes, parent: Core.Node, state: Context.State, symbol: Core.Record): void => {
  if (symbol.value !== Parser.Symbols.Node && symbol.value !== Parser.Symbols.AliasNode) {
    const node = parent.getChild(direction)!;
    if (symbol.value === Parser.Symbols.Token) {
      const identifier = node.fragment.data;
      const entry = state.references[identifier];
      if (entry !== void 0) {
        parent.setChild(direction, new Identity.Node(node, entry.identity));
      } else {
        project.errors.push(new Core.Error(node.fragment, Errors.UNRESOLVED_TOKEN_REFERENCE));
      }
    } else if (symbol.value === Parser.Symbols.AliasToken) {
      project.errors.push(new Core.Error(node.fragment, Errors.INVALID_ALIAS_TOKEN_REFERENCE));
    } else {
      project.errors.push(new Core.Error(node.fragment, Errors.UNRESOLVED_IDENTIFIER));
    }
  }
};

/**
 * Validate the corresponding reference for the specified symbol in a 'SKIP' pattern context.
 * REMARKS: Skips can only accept alias tokens references.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param symbol Input symbol.
 */
const resolveSkip = (project: Project, node: Core.Node, state: Context.State, symbol: Core.Record): void => {
  if (symbol.value !== Parser.Symbols.AliasToken) {
    if (symbol.value === Parser.Symbols.Token) {
      project.errors.push(new Core.Error(node.fragment, Errors.INVALID_TOKEN_REFERENCE));
    } else if (symbol.value === Parser.Symbols.Node) {
      project.errors.push(new Core.Error(node.fragment, Errors.INVALID_NODE_REFERENCE));
    } else if (symbol.value === Parser.Symbols.AliasNode) {
      project.errors.push(new Core.Error(node.fragment, Errors.INVALID_ALIAS_NODE_REFERENCE));
    } else {
      project.errors.push(new Core.Error(node.fragment, Errors.UNRESOLVED_IDENTIFIER));
    }
  }
};

/**
 * Consume the specified input node resolving its reference pattern.
 * @param project Input project.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
export const consume = (project: Project, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  const node = parent.getChild(direction)!;
  const symbol = node.table?.get(node.fragment.data);
  if (!symbol) {
    project.errors.push(new Core.Error(node.fragment, Errors.UNDEFINED_IDENTIFIER));
  } else {
    switch (state.type) {
      case Context.Types.Token:
        resolveToken(project, node, symbol);
        break;
      case Context.Types.Node:
        resolveNode(project, direction, parent, state, symbol);
        break;
      case Context.Types.Skip:
        resolveSkip(project, node, state, symbol);
    }
  }
};
