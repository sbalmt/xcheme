import * as Core from '@xcheme/core';

import * as Project from '../core/project';
import * as Types from '../core/types';
import * as Parser from '../parser';

import { Errors } from '../core/errors';

import * as Token from './patterns/token';
import * as Context from './context';
import * as Tree from './tree';

/**
 * Emit a new loose token and returns its corresponding record.
 * @param project Project context.
 * @param node Loose record node.
 * @param state Consumption state.
 * @returns Returns the generated record.
 */
const emit = (project: Project.Context, node: Types.Node, state: Context.State): Types.Record => {
  const identity = Project.Context.identity.increment(project.coder, project.options.identity);
  const identifier = `@REF${identity}`;
  const token = Tree.getDirective(
    Parser.Nodes.Token,
    node.table,
    Tree.getIdentifier(Parser.Nodes.Token, identifier, identity, node.table, node.fragment.location),
    node
  );
  const temp = Context.getNewState(state.anchor, identity);
  temp.origin = Types.Origins.Loose;
  Token.consume(project, Core.Nodes.Right, token, temp);
  token.set(Core.Nodes.Next, state.anchor.next);
  state.anchor.set(Core.Nodes.Next, token);
  state.anchor = token;
  return temp.record!;
};

/**
 * Determines whether or not there are a collision for the given name.
 * @param project Project context.
 * @param identifier Record identifier.
 * @param node Input node.
 * @returns Returns true when the specified name already exists, false otherwise.
 */
export const collision = (project: Project.Context, identifier: string, node: Types.Node): boolean => {
  if (project.symbols.has(identifier)) {
    project.addError(node.fragment, Errors.TOKEN_COLLISION);
    return true;
  }
  return false;
};

/**
 * Resolve the loose pattern record for the given node.
 * @param project Project context.
 * @param identifier Record identifier.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the loose pattern record.
 */
export const resolve = (
  project: Project.Context,
  identifier: string,
  node: Types.Node,
  state: Context.State
): Types.Record => {
  const record = project.symbols.get(identifier);
  if (record) {
    if (record.data.origin === Types.Origins.User) {
      project.addError(node.fragment, Errors.TOKEN_COLLISION);
    }
    return record;
  }
  return emit(project, node, state);
};
