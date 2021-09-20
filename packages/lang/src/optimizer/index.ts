import * as Core from '@xcheme/core';

import * as Parser from '../parser';
import * as Reference from './reference';
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
    const state = {
      type: Context.Types.Undefined,
      alias: false,
      anchor: node,
      entry: {
        type: Reference.Types.Undefined,
        identity: counter,
        identifier: '?',
        dynamic: false
      },
      references,
      counter
    };
    const entry = node.next;
    if (entry.value === Parser.Nodes.Skip) {
      Skip.consume(project, Core.Nodes.Next, node, state);
    } else {
      const directive = entry.right!;
      if (directive.left !== void 0) {
        state.entry.identity = parseInt(directive.left.fragment.data) || counter;
      }
      switch (entry.value) {
        case Parser.Nodes.Token:
          Token.consume(project, Core.Nodes.Right, entry, state);
          break;
        case Parser.Nodes.Node:
          Node.consume(project, Core.Nodes.Right, entry, state);
          break;
        case Parser.Nodes.AliasToken:
          state.alias = true;
          Token.consume(project, Core.Nodes.Right, entry, state);
          break;
        case Parser.Nodes.AliasNode:
          state.alias = true;
          Node.consume(project, Core.Nodes.Right, entry, state);
          break;
      }
    }
    counter = state.counter + 1;
    node = entry;
  }
  return project.errors.length === 0;
};
