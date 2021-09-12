import * as Core from '@xcheme/core';

import * as Directive from '../nodes/directive';
import * as Expression from './expression';
import * as Reference from '../reference';
import * as Context from '../context';

import { Project } from '../../core/project';

/**
 * Consume the specified input node resolving its 'NODE' pattern.
 * @param project Input project.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 * @param alias Determines whether or not the node is an alias.
 */
export const consume = (project: Project, direction: Core.Nodes, parent: Core.Node, state: Context.State, alias: boolean): void => {
  const node = parent.getChild(direction)!;
  const entry = { type: Reference.Types.User, identity: state.identity, identifier: node.fragment.data };
  const type = state.type;
  state.type = Context.Types.Node;
  Expression.consume(project, Core.Nodes.Right, node, state);
  parent.setChild(direction, new Directive.Node(node, entry.identity, alias));
  state.references[entry.identifier] = entry;
  state.type = type;
};
