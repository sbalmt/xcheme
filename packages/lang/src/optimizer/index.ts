import * as Parser from '@xcheme/parser';

import * as Project from '../core/project';
import * as Types from '../core/types';
import * as Context from './context';

import * as Import from './patterns/import';
import * as Export from './patterns/export';
import * as Node from './patterns/node';
import * as Token from './patterns/token';
import * as Skip from './patterns/skip';

import { Exception } from '../core/exception';

/**
 * Resolve the TOKEN or NODE directive in the given node.
 * @param project Project context.
 * @param node Directive node.
 * @param state Consumption state.
 * @throws Throws an exception when the given node isn't a valid directive.
 */
const resolve = (project: Project.Context, node: Types.Node, state: Context.State): void => {
  const directive = node.right!;
  if (!directive.assigned) {
    switch (node.value) {
      case Parser.Nodes.Token:
      case Parser.Nodes.AliasToken:
        Token.consume(project, directive, state);
        break;
      case Parser.Nodes.Node:
      case Parser.Nodes.AliasNode:
        Node.consume(project, directive, state);
        break;
      default:
        throw new Exception(`Unsupported directive: "${node.fragment.data}" (${node.value}).`);
    }
  }
};

/**
 * Consume the specified node (organized as an AST) and optimize that AST for the maker.
 * @param project Project context.
 * @param node Main node.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export const consumeNodes = (project: Project.Context, node: Types.Node): boolean => {
  for (let current; (current = node.next); ) {
    const state = Context.getNewState(node);
    switch (current.value) {
      case Parser.Nodes.Import:
        Import.consume(project, current);
        break;
      case Parser.Nodes.Export:
        if (!Export.consume(project, current)) {
          resolve(project, current.right!, state);
          state.record!.data.exported = true;
        }
        break;
      case Parser.Nodes.Skip:
        Skip.consume(project, current, state);
        break;
      default:
        resolve(project, current, state);
    }
    node = state.anchor.next!;
  }
  return project.errors.length === 0;
};
