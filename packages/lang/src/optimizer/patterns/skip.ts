import * as Core from '@xcheme/core';

import * as Directive from '../nodes/directive';
import * as Context from '../context';

import { Project } from '../../core/project';

import * as Entries from '../../core/entries';

import * as Expression from './expression';

/**
 * Consume the specified input node resolving its 'SKIP' pattern.
 * @param project Input project.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
export const consume = (project: Project, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  const node = parent.getChild(direction)!;
  const entry = state.entry;
  const type = state.type;
  state.type = Context.Types.Skip;
  entry.origin = Entries.Origins.User;
  entry.identifier = `@SKIP${entry.identity}`;
  Expression.consume(project, Core.Nodes.Right, node, state);
  project.skipEntries.add(entry.type, entry.origin, entry.identifier, entry.identity, entry.dynamic);
  parent.setChild(direction, new Directive.Node(node, entry));
  state.type = type;
};
