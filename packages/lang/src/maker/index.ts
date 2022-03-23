import * as Core from '@xcheme/core';

import * as Nodes from '../core/nodes';
import * as Project from '../core/project';
import * as Parser from '../parser';

import { Exception } from '../core/exception';

import * as Node from './patterns/node';
import * as Token from './patterns/token';
import * as Skip from './patterns/skip';

/**
 * Resolve the token or node directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Main node.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveMain = (project: Project.Context, node: Core.Node): void => {
  const directive = node.right!;
  if (!(directive instanceof Nodes.Directive)) {
    throw new Exception('The node must be an instance of a directive node.');
  }
  const state = { directive, dynamic: directive.dynamic };
  switch (node.value) {
    case Parser.Nodes.Token:
      Token.consume(project, state);
      break;
    case Parser.Nodes.Node:
      Node.consume(project, state);
      break;
    case Parser.Nodes.AliasToken:
      Token.consume(project, state);
      break;
    case Parser.Nodes.AliasNode:
      Node.consume(project, state);
      break;
    default:
      throw new Exception(`Invalid node type (${node.value}).`);
  }
};

/**
 * Resolve the skip directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Skip node.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveSkip = (project: Project.Context, node: Core.Node): void => {
  if (!(node instanceof Nodes.Directive)) {
    throw new Exception('The SKIP node must be an instance of a directive nodes.');
  }
  const state = { directive: node, dynamic: false };
  Skip.consume(project, state);
};

/**
 * Consume the specified node (organized as an AST) and update the given project.
 * @param node Root node.
 * @param project Project context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export const consumeNodes = (node: Core.Node, project: Project.Context): boolean => {
  while ((node = node.next!)) {
    if (node.value === Parser.Nodes.Import) {
      // Just ignore for now...
    } else if (node.value === Parser.Nodes.Export) {
      const current = node.right!;
      if (current.value !== Parser.Nodes.Identifier) {
        resolveMain(project, current);
      }
    } else if (node.value === Parser.Nodes.Skip) {
      resolveSkip(project, node);
    } else {
      resolveMain(project, node);
    }
  }
  return project.errors.length === 0;
};
