import * as Core from '@xcheme/core';

import * as Parser from '../parser';
import * as Context from './context';

import * as Skip from './patterns/skip';
import * as Token from './patterns/token';
import * as Node from './patterns/node';

import { Project } from '../core/project';

/**
 * Consume the specified node (organized as an AST) and generate an optimized AST for the maker.
 * @param node Input node.
 * @param project Input project.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export const consumeNodes = (node: Core.Node, project: Project): boolean => {
  let counter = project.options.initialIdentity ?? 0;
  const references = {};
  while (node.next !== void 0) {
    const entry = node.next;
    const state = { type: Context.Types.Undefined, entry: node, references, identity: counter };
    if (entry.value === Parser.Nodes.Skip) {
      Skip.consume(project, Core.Nodes.Next, node, state);
    } else {
      const directive = entry.right!;
      state.identity = (directive.left ? parseInt(directive.left?.fragment.data) : NaN) || counter;
      switch (entry.value) {
        case Parser.Nodes.Token:
          Token.consume(project, Core.Nodes.Right, entry, state, false);
          break;
        case Parser.Nodes.Node:
          Node.consume(project, Core.Nodes.Right, entry, state, false);
          break;
        case Parser.Nodes.AliasToken:
          Token.consume(project, Core.Nodes.Right, entry, state, true);
          break;
        case Parser.Nodes.AliasNode:
          Node.consume(project, Core.Nodes.Right, entry, state, true);
          break;
      }
    }
    counter = state.identity + 1;
    node = node.next;
  }
  return project.errors.length === 0;
};
