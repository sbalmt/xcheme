import * as Core from '@xcheme/core';

import * as Project from '../../core/project';
import * as Entries from '../../core/entries';
import * as Context from '../context';
import * as Nodes from '../nodes';

import { Errors } from '../../core/errors';

import * as Expression from './expression';
import * as Token from './token';

/**
 * Consume a child node from the AST on the given parent and optimize the string pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
export const consume = (project: Project.Context, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  if (state.type === Context.Types.Node) {
    const node = parent.getChild(direction)!;
    const word = node.fragment.data;
    let entry = project.tokenEntries.get(word);
    if (entry !== void 0) {
      if (entry.origin === Entries.Origins.User) {
        project.addError(node, Errors.TOKEN_COLLISION);
      }
    } else {
      const temp = Context.getNewState(state.anchor, state.counter);
      const identifier = `@REF${temp.entry.identity}`;
      const token = Nodes.getToken(identifier, node.table, node.fragment.location, node);
      temp.entry.origin = Entries.Origins.Loose;
      temp.counter++;
      Token.consume(project, Core.Nodes.Right, token, temp);
      token.setChild(Core.Nodes.Next, state.anchor.next);
      state.counter = temp.counter;
      state.anchor.setChild(Core.Nodes.Next, token);
      state.anchor = token;
      entry = project.tokenEntries.get(word)!;
    }
    const reference = Nodes.getReference(entry.identifier, node.table, node.fragment.location);
    parent.setChild(direction, reference);
    Expression.consume(project, direction, parent, state);
  }
};
