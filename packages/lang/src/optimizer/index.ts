import * as Core from '@xcheme/core';

import * as Project from '../core/project';
import * as Parser from '../parser';
import * as Context from './context';

import * as Import from './patterns/import';
import * as Export from './patterns/export';
import * as Node from './patterns/node';
import * as Token from './patterns/token';
import * as Skip from './patterns/skip';

/**
 * Resolve the identity from the given node.
 * @param node Input node.
 * @returns Returns the identity.
 */
const resolveIdentity = (node: Core.Node): number => {
  if (node.left) {
    const identity = node.left.fragment.data;
    if (identity === 'auto') {
      return Core.BaseSource.Output;
    }
    return parseInt(identity);
  }
  return NaN;
};

/**
 * Resolve the token or node directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 */
const resolveTokenOrNode = (project: Project.Context, node: Core.Node, state: Context.State): void => {
  state.entry.identity = resolveIdentity(node.right!) || Context.getCount(project);
  switch (node.value) {
    case Parser.Nodes.Token:
      Token.consume(project, Core.Nodes.Right, node, state);
      break;
    case Parser.Nodes.Node:
      Node.consume(project, Core.Nodes.Right, node, state);
      break;
    case Parser.Nodes.AliasToken:
      state.entry.alias = true;
      Token.consume(project, Core.Nodes.Right, node, state);
      break;
    case Parser.Nodes.AliasNode:
      state.entry.alias = true;
      Node.consume(project, Core.Nodes.Right, node, state);
      break;
    default:
      throw `Unexpected AST node.`;
  }
};

/**
 * Consume the specified node (organized as an AST) and optimize that AST for the maker.
 * @param node Input node.
 * @param project Project context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export const consumeNodes = (node: Core.Node, project: Project.Context): boolean => {
  let current;
  while ((current = node.next)) {
    const state = Context.getNewState(node, -1);
    switch (current.value) {
      case Parser.Nodes.Import:
        Import.resolve(project, current);
        break;
      case Parser.Nodes.Export:
        if (!Export.resolve(project, current)) {
          state.entry.exported = true;
          resolveTokenOrNode(project, current.right!, state);
        }
        break;
      case Parser.Nodes.Skip:
        state.entry.identity = Context.getCount(project);
        Skip.consume(project, Core.Nodes.Next, node, state);
        break;
      default:
        resolveTokenOrNode(project, current, state);
    }
    node = state.anchor.next!;
  }
  return project.errors.length === 0;
};
