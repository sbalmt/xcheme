import * as Core from '@xcheme/core';

import * as Project from '../core/project';
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
 * Resolve the TOKEN or NODE directive for the given node.
 * @param project Project context.
 * @param node Directive node.
 * @param state Consumption state.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolve = (project: Project.Context, node: Core.Node, state: Context.State): void => {
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
    const state = Context.getNewState(node);
    switch (current.value) {
      case Parser.Nodes.Import:
        Import.consume(project, current);
        break;
      case Parser.Nodes.Export:
        if (!Export.consume(project, current, state)) {
          resolve(project, current.right!, state);
          state.record!.data.exported = true;
        }
        break;
      case Parser.Nodes.Skip:
        Skip.consume(project, Core.Nodes.Next, node, state);
        break;
      default:
        resolve(project, current, state);
    }
    node = state.anchor.next!;
  }
  return project.errors.length === 0;
};
