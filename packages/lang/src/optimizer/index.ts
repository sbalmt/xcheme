import * as Core from '@xcheme/core';

import * as Parser from '../parser';
import * as Context from './context';

import * as Skip from './patterns/skip';
import * as Token from './patterns/token';
import * as Node from './patterns/node';

import { Project } from '../core/project';

import * as Entries from '../core/entries';

/**
 * Consume the specified node (organized as an AST) and generate an optimized AST for the maker.
 * @param node Input node.
 * @param project Input project.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export const consumeNodes = (node: Core.Node, project: Project): boolean => {
  let counter = project.options.initialIdentity ?? 0;
  while (node.next !== void 0) {
    const state = Context.getNewState(node, counter);
    const entry = node.next;
    if (entry.value === Parser.Nodes.Skip) {
      state.entry.type = Entries.Types.Normal;
      Skip.consume(project, Core.Nodes.Next, node, state);
    } else {
      const directive = entry.right!;
      if (directive.left !== void 0) {
        state.entry.identity = parseInt(directive.left.fragment.data) || counter;
      }
      switch (entry.value) {
        case Parser.Nodes.Token:
          state.entry.type = Entries.Types.Normal;
          Token.consume(project, Core.Nodes.Right, entry, state);
          break;
        case Parser.Nodes.Node:
          state.entry.type = Entries.Types.Normal;
          Node.consume(project, Core.Nodes.Right, entry, state);
          break;
        case Parser.Nodes.AliasToken:
          state.entry.type = Entries.Types.Alias;
          Token.consume(project, Core.Nodes.Right, entry, state);
          break;
        case Parser.Nodes.AliasNode:
          state.entry.type = Entries.Types.Alias;
          Node.consume(project, Core.Nodes.Right, entry, state);
          break;
      }
    }
    counter = state.counter + 1;
    node = entry;
  }
  return project.errors.length === 0;
};
