import * as Core from '@xcheme/core';

import * as Directive from '../nodes/directive';
import * as Context from '../context';

import { Project } from '../../core/project';

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
  const identity = state.identity;
  const type = state.type;
  state.type = Context.Types.Skip;
  Expression.consume(project, Core.Nodes.Right, node, state);
  parent.setChild(direction, new Directive.Node(node, identity, false));
  state.type = type;
};
