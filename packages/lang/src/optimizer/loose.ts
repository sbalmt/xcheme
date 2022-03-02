import * as Core from '@xcheme/core';

import * as Project from '../core/project';
import * as Symbols from '../core/symbols';

import { Errors } from '../core/errors';

import * as Token from './patterns/token';
import * as Context from './context';
import * as Nodes from './nodes';

/**
 * Emit a new loose token and returns the corresponding record.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the generated record.
 */
const emit = (project: Project.Context, node: Core.Node, state: Context.State): Core.Record => {
  const identity = Project.Context.identity.increment(project.coder, project.options.identity);
  const token = Nodes.getToken(`@REF${identity}`, node.table, node.fragment.location, node);
  const temp = Context.getNewState(state.anchor, identity);
  temp.origin = Symbols.Origins.Loose;
  Token.consume(project, Core.Nodes.Right, token, temp);
  token.setChild(Core.Nodes.Next, state.anchor.next);
  state.anchor.setChild(Core.Nodes.Next, token);
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
export const collision = (project: Project.Context, identifier: string, node: Core.Node): boolean => {
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
  node: Core.Node,
  state: Context.State
): Core.Record => {
  const record = project.symbols.get(identifier);
  if (record) {
    if (record.data.origin === Symbols.Origins.User) {
      project.addError(node.fragment, Errors.TOKEN_COLLISION);
    }
    return record;
  }
  return emit(project, node, state);
};
