import * as Core from '@xcheme/core';

import * as Directive from '../core/nodes/directive';
import * as Project from '../core/project';
import * as Parser from '../parser';

import { Errors } from '../core/errors';

import * as Node from './patterns/node';
import * as Token from './patterns/token';
import * as Skip from './patterns/skip';

/**
 * Resolve the token or node directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 */
const resolveTokenOrNode = (project: Project.Context, node: Core.Node): void => {
  const directive = node.right!;
  if (!(directive instanceof Directive.Node)) {
    throw `An AST node directive is expected.`;
  }
  const state = { directive };
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
      throw `Unsupported AST node directive.`;
  }
};

/**
 * Resolve the skip directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 */
const resolveSkip = (project: Project.Context, node: Core.Node): void => {
  if (!(node instanceof Directive.Node)) {
    project.addError(node, Errors.UNEXPECTED_NODE);
  } else {
    const state = { directive: node };
    Skip.consume(project, state);
  }
};

/**
 * Consume the specified node (organized as an AST) and produce output entries for updating the given project.
 * @param node Input node.
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
        resolveTokenOrNode(project, current);
      }
    } else if (node.value === Parser.Nodes.Skip) {
      resolveSkip(project, node);
    } else {
      resolveTokenOrNode(project, node);
    }
  }
  return project.errors.length === 0;
};
