import * as Core from '@xcheme/core';

import * as Parser from '../parser';

import { Errors } from '../core/errors';
import { Project } from './common/project';

import * as Skip from './patterns/skip';
import * as Token from './patterns/token';
import * as Node from './patterns/node';

/**
 * Get the identity from the specified node.
 * @param node Identifiable node.
 * @param identity Default identity.
 * @returns Returns the node identity.
 */
const getIdentity = (node: Core.Node, identity: number): number => {
  if (node.left) {
    return parseInt(node.left.fragment.data);
  }
  return identity;
};

/**
 * Consume the specified node (organized as an AST) and produce output entries for updating the given project.
 * @param node Input node.
 * @param project Input project.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export const consumeNodes = (node: Core.Node, project: Project): boolean => {
  const pointer = new Set<string>();
  for (let counter = project.options.initialIdentity ?? 0; (node = node.next!); counter++) {
    const current = node.right!;
    let state;
    if (node.value === Parser.Nodes.Skip) {
      state = Skip.consume(project, current, pointer, counter);
    } else {
      const identity = getIdentity(current, counter);
      switch (node.value) {
        case Parser.Nodes.Token:
          state = Token.consume(project, current, identity, pointer, counter, false);
          break;
        case Parser.Nodes.Node:
          state = Node.consume(project, current, identity, pointer, counter, false);
          break;
        case Parser.Nodes.AliasToken:
          state = Token.consume(project, current, identity, pointer, counter, true);
          break;
        case Parser.Nodes.AliasNode:
          state = Node.consume(project, current, identity, pointer, counter, true);
          break;
        default:
          project.errors.push(new Core.Error(node.fragment, Errors.UNEXPECTED_NODE));
      }
    }
    if (state) {
      counter = state.counter;
    }
  }
  return project.errors.length === 0;
};
