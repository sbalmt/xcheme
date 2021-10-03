import * as Core from '@xcheme/core';

import * as Project from '../core/project';
import * as Parser from '../parser';
import * as Context from './context';

import * as Skip from './patterns/skip';
import * as Token from './patterns/token';
import * as Node from './patterns/node';

/**
 * Consume the specified node (organized as an AST) and optimize that AST for the maker.
 * @param node Input node.
 * @param project Project context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export const consumeNodes = (node: Core.Node, project: Project.Context): boolean => {
  let counter = project.options.initialIdentity ?? 0;
  let current;
  while ((current = node.next) !== void 0) {
    const state = Context.getNewState(node, counter);
    if (current.value === Parser.Nodes.Skip) {
      state.counter++;
      Skip.consume(project, Core.Nodes.Next, node, state);
    } else {
      const directive = current.right!;
      state.entry.identity = parseInt(directive.left?.fragment.data as string) || state.counter++;
      switch (current.value) {
        case Parser.Nodes.Token:
          Token.consume(project, Core.Nodes.Right, current, state);
          break;
        case Parser.Nodes.Node:
          Node.consume(project, Core.Nodes.Right, current, state);
          break;
        case Parser.Nodes.AliasToken:
          state.entry.alias = true;
          Token.consume(project, Core.Nodes.Right, current, state);
          break;
        case Parser.Nodes.AliasNode:
          state.entry.alias = true;
          Node.consume(project, Core.Nodes.Right, current, state);
          break;
      }
    }
    counter = state.counter;
    node = state.anchor.next!;
  }
  return project.errors.length === 0;
};
