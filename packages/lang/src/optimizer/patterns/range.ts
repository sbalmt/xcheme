import * as Core from '@xcheme/core';

import * as Reference from '../reference';
import * as Context from '../context';
import * as Tree from '../tree';

import { Errors } from '../../core/errors';
import { Project } from '../../core/project';

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
    const from = node.left!.fragment.data;
    const to = node.right!.fragment.data;
    const range = `${from}-${to}`;
    let entry = state.references[range];
    if (entry !== void 0) {
      if (entry.type === Reference.Types.User) {
        project.errors.push(new Core.Error(node.fragment, Errors.TOKEN_COLLISION));
      }
    } else {
      const token = Tree.getToken(`@REF${++state.identity}`, node.table, node.fragment.location, node);
      Token.consume(project, Core.Nodes.Right, token, state, false);
      token.setChild(Core.Nodes.Next, state.entry.next);
      state.entry.setChild(Core.Nodes.Next, token);
      state.entry = token;
      entry = state.references[range];
    }
    const reference = Tree.getReference(entry.identifier, node.table, node.fragment.location);
    parent.setChild(direction, reference);
    Expression.consume(project, direction, parent, state);
  }
};
