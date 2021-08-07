import * as Core from '@xcheme/core';

import * as Parser from '../parser';

import { Errors } from '../core/errors';
import { Project } from './common/project';

import * as Skip from './patterns/skip';
import * as Token from './patterns/token';
import * as Node from './patterns/node';

/**
 * Consume the specified node (organized as an AST) and produce output entries for updating the given project.
 * @param node Input node.
 * @param project Output project.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export const consumeNodes = (node: Core.Node, project: Project): boolean => {
  const pointer = new Set<string>();
  const counter = {
    token: project.options.counters?.token ?? 1000,
    node: project.options.counters?.node ?? 2000
  };
  let skipCounter = 0;
  while ((node = node.next!)) {
    switch (node.value) {
      case Parser.Nodes.Skip:
        Skip.consume(project, node.right!, skipCounter++, pointer, counter);
        break;
      case Parser.Nodes.Token:
        Token.consume(project, node.right!, pointer, counter, false);
        counter.token++;
        break;
      case Parser.Nodes.AliasToken:
        Token.consume(project, node.right!, pointer, counter, true);
        counter.token++;
        break;
      case Parser.Nodes.Node:
        Node.consume(project, node.right!, pointer, counter, false);
        counter.node++;
        break;
      case Parser.Nodes.AliasNode:
        Node.consume(project, node.right!, pointer, counter, true);
        counter.node++;
        break;
      default:
        project.errors.push(new Core.Error(node.fragment, Errors.UNEXPECTED_NODE));
    }
  }
  return project.errors.length === 0;
};
