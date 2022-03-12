import * as Core from '@xcheme/core';

import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as Context from '../context';
import * as Loose from '../loose';
import * as Nodes from '../nodes';

import * as Expression from './expression';

/**
 * Consume a child node from the AST on the given parent and optimize the string pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
export const consume = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Core.Node,
  state: Context.State
): void => {
  if (state.type === Symbols.Types.Node) {
    const node = parent.get(direction)!;
    const record = Loose.resolve(project, node.fragment.data, node, state);
    const reference = Nodes.getReference(record.data.identifier, node.table, node.fragment.location);
    parent.set(direction, reference);
    Expression.consume(project, direction, parent, state);
  }
};
