import * as Core from '@xcheme/core';

import * as Project from '../core/project';
import * as Counter from '../core/counter';
import * as Parser from '../parser';
import * as Identity from './identity';
import * as Context from './context';

import * as Import from './patterns/import';
import * as Export from './patterns/export';
import * as Node from './patterns/node';
import * as Token from './patterns/token';
import * as Skip from './patterns/skip';

import { Exception } from '../core/exception';

/**
 * Global skip counter.
 */
const skipCounter = new Counter.Context();

/**
 * Resolve the token or node directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Directive node.
 * @param state Consumption state.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveTokenOrNode = (project: Project.Context, node: Core.Node, state: Context.State): void => {
  state.identity = Identity.consume(node.right!);
  switch (node.value) {
    case Parser.Nodes.Token:
    case Parser.Nodes.AliasToken:
      Token.consume(project, Core.Nodes.Right, node, state);
      break;
    case Parser.Nodes.Node:
    case Parser.Nodes.AliasNode:
      Node.consume(project, Core.Nodes.Right, node, state);
      break;
    default:
      throw new Exception(`Invalid node type (${node.value}).`);
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
        Import.consume(project, current);
        break;
      case Parser.Nodes.Export:
        if (!Export.consume(project, current, state)) {
          resolveTokenOrNode(project, current.right!, state);
          state.record!.data.exported = true;
        }
        break;
      case Parser.Nodes.Skip:
        state.identity = skipCounter.increment(project);
        Skip.consume(project, Core.Nodes.Next, node, state);
        break;
      default:
        resolveTokenOrNode(project, current, state);
    }
    node = state.anchor.next!;
  }
  return project.errors.length === 0;
};
