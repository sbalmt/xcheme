import * as Core from '@xcheme/core';

import * as Project from '../core/project';
import * as Entries from '../core/entries';

import { Errors } from '../core/errors';

import * as Token from './patterns/token';
import * as Context from './context';
import * as Nodes from './nodes';

/**
 * Emit a new loose token and returns the corresponding pattern entry.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param name Entry name.
 * @returns Returns the generated pattern entry.
 */
const emit = (project: Project.Context, node: Core.Node, state: Context.State, name: string): Entries.Entry => {
  const temp = Context.getNewState(state.anchor, state.counter);
  const token = Nodes.getToken(`@REF${temp.entry.identity}`, node.table, node.fragment.location, node);
  temp.entry.origin = Entries.Origins.Loose;
  temp.counter++;
  Token.consume(project, Core.Nodes.Right, token, temp);
  token.setChild(Core.Nodes.Next, state.anchor.next);
  state.counter = temp.counter;
  state.anchor.setChild(Core.Nodes.Next, token);
  state.anchor = token;
  return project.tokenEntries.get(name)!;
};

/**
 * Determines whether or not there are an entry collision for the given name.
 * @param project Project context.
 * @param node Input node.
 * @param name Entry name.
 * @returns Returns true when the specified name already exists, false otherwise.
 */
export const collision = (project: Project.Context, node: Core.Node, name: string): boolean => {
  if (project.tokenEntries.has(name)) {
    project.addError(node, Errors.TOKEN_COLLISION);
    return true;
  }
  return false;
};

/**
 * Resolve the loose pattern entry for the given node.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param name Entry name.
 * @returns Returns the loose pattern entry.
 */
export const resolve = (project: Project.Context, node: Core.Node, state: Context.State, name: string): Entries.Entry => {
  const entry = project.tokenEntries.get(name);
  if (entry !== void 0) {
    if (entry.origin === Entries.Origins.User) {
      project.addError(node, Errors.TOKEN_COLLISION);
    }
    return entry;
  }
  return emit(project, node, state, name);
};
