import * as Core from '@xcheme/core';

import * as Entries from '../../core/entries';
import * as Project from '../../core/project';
import * as Context from '../context';
import * as Loose from '../loose';
import * as Nodes from '../nodes';

import * as Expression from './expression';

/**
 * Consume a child node from the AST on the given parent and optimize the range pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
export const consume = (project: Project.Context, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  if (state.entry.type === Entries.Types.Node) {
    const node = parent.getChild(direction)!;
    const name = `${node.left!.fragment.data}-${node.right!.fragment.data}`;
    const entry = Loose.resolve(project, node, state, name);
    const reference = Nodes.getReference(entry.identifier, node.table, node.fragment.location);
    parent.setChild(direction, reference);
    Expression.consume(project, direction, parent, state);
  }
};
