import * as Core from '@xcheme/core';

import * as Directive from '../core/nodes/directive';
import * as Project from '../core/project';
import * as Parser from '../parser';

import { Errors } from '../core/errors';

import * as Skip from './patterns/skip';
import * as Token from './patterns/token';
import * as Node from './patterns/node';

/**
 * Consume the specified node (organized as an AST) and produce output entries for updating the given project.
 * @param node Input node.
 * @param project Project context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export const consumeNodes = (node: Core.Node, project: Project.Context): boolean => {
  while ((node = node.next!) !== void 0) {
    if (node.value === Parser.Nodes.Skip) {
      if (!(node instanceof Directive.Node)) {
        project.addError(node, Errors.UNEXPECTED_NODE);
      } else {
        const state = { directive: node };
        Skip.consume(project, state);
      }
    } else {
      const directive = node.right!;
      if (!(directive instanceof Directive.Node)) {
        project.addError(node, Errors.UNEXPECTED_NODE);
      } else {
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
            project.addError(directive, Errors.UNEXPECTED_NODE);
        }
      }
    }
  }
  return project.errors.length === 0;
};
