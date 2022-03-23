import * as Core from '@xcheme/core';

import * as Nodes from '../../../core/nodes';
import * as Project from '../../../core/project';
import * as Parser from '../../../parser';
import * as Identity from '../../identity';
import * as Context from '../../context';

import * as Expression from '../expression';

/**
 * Emit a new state node replacing the current one for an optimized one.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param identity Node identity.
 */
const emit = (direction: Core.Nodes, parent: Core.Node, identity: number): void => {
  const node = parent.get(direction)!;
  const replacement = new Nodes.Identity(node, identity);
  parent.set(direction, replacement);
};

/**
 * Consume a child node from the AST on the given parent and optimize the state pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
export const consume = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Core.Node,
  state: Context.State
): void => {
  const node = parent.get(direction)!;
  const expression = node.right!;
  if (expression.value === Parser.Nodes.State) {
    const identity = Identity.resolve(expression);
    Expression.consume(project, Core.Nodes.Right, expression, state);
    emit(direction, parent, identity);
  } else {
    Expression.consume(project, Core.Nodes.Right, node, state);
    emit(direction, parent, state.identity);
  }
};
