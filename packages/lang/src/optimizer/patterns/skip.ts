import * as Core from '@xcheme/core';

import * as Directive from '../../core/nodes/directive';
import * as Project from '../../core/project';
import * as Entries from '../../core/entries';
import * as Context from '../context';

import * as Expression from './expression';

/**
 * Emit a new skip entry and replace the current skip node by an optimized one.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const emit = (project: Project.Context, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  const { origin, identifier, identity } = state.entry;
  const node = parent.getChild(direction)!;
  const entry = project.local.create(Entries.Types.Skip, origin, identifier, identity, state.entry);
  const replacement = new Directive.Node(node, Directive.Types.Skip, entry);
  parent.setChild(direction, replacement);
};

/**
 * Consume a child node from the AST on the given parent and optimize the 'SKIP' directive.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  const node = parent.getChild(direction)!;
  const entry = state.entry;
  entry.type = Entries.Types.Skip;
  entry.identifier = `@SKIP${entry.identity}`;
  Expression.consume(project, Core.Nodes.Right, node, state);
  emit(project, direction, parent, state);
};
