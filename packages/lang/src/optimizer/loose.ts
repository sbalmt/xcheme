import * as Core from '@xcheme/core';

import * as Project from '../core/project';
import * as Entries from '../core/entries';
import * as Token from './patterns/token';
import * as Context from './context';
import * as Nodes from './nodes';

/**
 * Emit a new loose token and returns the corresponding pattern entry.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param name Loose token name.
 * @returns Returns the generated pattern entry.
 */
export const emitToken = (project: Project.Context, node: Core.Node, state: Context.State, name: string): Entries.Entry => {
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
