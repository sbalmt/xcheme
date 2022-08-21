import * as Core from '@xcheme/core';

import * as Project from '../core/project';
import * as Types from '../core/types';

import { Errors } from '../core/errors';

import * as Token from './patterns/token';
import * as Context from './context';
import * as Tree from './tree';

/**
 * Emit a new loose token and returns its corresponding record.
 * @param project Project context.
 * @param node Loose node.
 * @param state Consumption state.
 * @returns Returns the generated record.
 */
const emit = (project: Project.Context, node: Types.Node, state: Context.State): Types.SymbolRecord => {
  const location = node.fragment.location;
  const identity = Project.Context.identity.increment(project.coder, project.options.identity);
  const identifier = Tree.getIdentifier(Tree.Directives.Token, location, node.table, `@REF${identity}`, identity);
  const token = Tree.getDirective(Tree.Directives.Token, node.table, identifier, node.clone());
  const temp = Context.getNewState(state.anchor);
  temp.origin = Types.Origins.Loose;
  Token.consume(project, token.right!, temp);
  token.set(Core.NodeDirection.Next, state.anchor.next);
  state.anchor.set(Core.NodeDirection.Next, token);
  state.anchor = token;
  return temp.record!;
};

/**
 * Determines whether or not there's a collision for the given name.
 * @param project Project context.
 * @param identifier Record identifier.
 * @param node Loose node.
 * @returns Returns true when the specified name already exists, false otherwise.
 */
export const collision = (project: Project.Context, identifier: string, node: Types.Node): boolean => {
  if (project.symbols.has(identifier)) {
    project.errors.emplace(node.fragment, Errors.TOKEN_COLLISION);
    return true;
  }
  return false;
};

/**
 * Resolve the loose pattern record for the given node.
 * @param project Project context.
 * @param identifier Record identifier.
 * @param node Loose node.
 * @param state Consumption state.
 * @returns Returns the loose pattern record.
 */
export const resolve = (
  project: Project.Context,
  identifier: string,
  node: Types.Node,
  state: Context.State
): Types.SymbolRecord => {
  const record = project.symbols.get(identifier);
  if (record) {
    if (record.data.origin === Types.Origins.User) {
      project.errors.emplace(node.fragment, Errors.TOKEN_COLLISION);
    }
    return record;
  }
  return emit(project, node, state);
};
