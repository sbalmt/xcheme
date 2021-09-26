import * as Core from '@xcheme/core';

import * as Context from '../context';
import * as Tree from '../tree';

import { Errors } from '../../core/errors';
import { Project } from '../../core/project';

import * as Entries from '../../core/entries';

import * as Expression from './expression';
import * as Token from './token';

/**
 * Consume the specified input node optimizing its range pattern.
 * @param project Input project.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
export const consume = (project: Project, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  if (state.type === Context.Types.Node) {
    const node = parent.getChild(direction)!;
    const range = `${node.left!.fragment.data}-${node.right!.fragment.data}`;
    let entry = project.tokenEntries.get(range);
    if (entry !== void 0) {
      if (entry.origin === Entries.Origins.User) {
        project.errors.push(new Core.Error(node.fragment, Errors.TOKEN_COLLISION));
      }
    } else {
      const identifier = `@REF${++state.counter}`;
      const token = Tree.getToken(identifier, node.table, node.fragment.location, node);
      const temp = Context.getNewState(state.anchor, state.counter);
      temp.entry.type = Entries.Types.Normal;
      temp.entry.origin = Entries.Origins.Loose;
      Token.consume(project, Core.Nodes.Right, token, temp);
      token.setChild(Core.Nodes.Next, state.anchor.next);
      state.counter = temp.counter;
      state.anchor.setChild(Core.Nodes.Next, token);
      state.anchor = token;
      entry = project.tokenEntries.get(range)!;
    }
    const reference = Tree.getReference(entry.identifier, node.table, node.fragment.location);
    parent.setChild(direction, reference);
    Expression.consume(project, direction, parent, state);
  }
};
