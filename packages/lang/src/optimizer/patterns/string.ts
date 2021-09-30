import * as Core from '@xcheme/core';

import * as Project from '../../core/project';
import * as Entries from '../../core/entries';
import * as Context from '../context';
import * as Loose from '../loose';
import * as Nodes from '../nodes';

import { Errors } from '../../core/errors';

import * as Expression from './expression';

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
      entry = Loose.emitToken(project, node, state, word);
    }
    const reference = Nodes.getReference(entry.identifier, node.table, node.fragment.location);
    parent.setChild(direction, reference);
    Expression.consume(project, direction, parent, state);
  }
};
