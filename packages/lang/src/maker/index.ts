import * as Core from '@xcheme/core';

import * as Parser from '../parser';
import * as Directive from '../optimizer/nodes/directive';

import { Errors } from '../core/errors';
import { Project } from '../core/project';

import * as Skip from './patterns/skip';
import * as Token from './patterns/token';
import * as Node from './patterns/node';

/**
 * Consume the specified node (organized as an AST) and produce output entries for updating the given project.
 * @param node Input node.
 * @param project Input project.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export const consumeNodes = (node: Core.Node, project: Project): boolean => {
  while ((node = node.next!) !== void 0) {
    if (node.value === Parser.Nodes.Skip) {
      if (!(node instanceof Directive.Node)) {
        project.errors.push(new Core.Error(node.fragment, Errors.UNEXPECTED_NODE));
      } else {
        Skip.consume(project, node);
      }
    } else {
      const directive = node.right!;
      if (!(directive instanceof Directive.Node)) {
        project.errors.push(new Core.Error(node.fragment, Errors.UNEXPECTED_NODE));
      } else {
        switch (node.value) {
          case Parser.Nodes.Token:
            Token.consume(project, directive);
            break;
          case Parser.Nodes.Node:
            Node.consume(project, directive);
            break;
          case Parser.Nodes.AliasToken:
            Token.consume(project, directive);
            break;
          case Parser.Nodes.AliasNode:
            Node.consume(project, directive);
            break;
          default:
            project.errors.push(new Core.Error(directive.fragment, Errors.UNEXPECTED_NODE));
        }
      }
    }
  }
  return project.errors.length === 0;
};
