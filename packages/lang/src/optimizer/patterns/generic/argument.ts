import * as Core from '@xcheme/core';

import * as Nodes from '../../../core/nodes';
import * as Project from '../../../core/project';
import * as Types from '../../../core/types';
import * as Parser from '../../../parser';
import * as Identity from '../../identity';
import * as Context from '../../context';

import * as Expression from '../expression';

/**
 * Emit a new identity node replacing the current one for an optimized.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param identity Node identity.
 * @returns Returns the replacement node.
 */
const emit = (direction: Core.Nodes, parent: Types.Node, identity: number): Nodes.Identity => {
  const node = parent.get(direction)!;
  const replacement = new Nodes.Identity(node, identity);
  parent.set(direction, replacement);
  return replacement;
};

/**
 * Consume a child node from the AST in the given parent and optimize the argument expression pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 * @returns Return the replacement node.
 */
export const consume = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Types.Node,
  state: Context.State
): Nodes.Identity => {
  const node = parent.get(direction)!;
  const expression = node.right!;
  if (expression.value !== Parser.Nodes.Arguments) {
    Expression.consume(project, Core.Nodes.Right, node, state);
    return emit(direction, parent, state.identity);
  }
  const identity = Identity.consume(project, expression, state, state.identity);
  Expression.consume(project, Core.Nodes.Right, expression, state);
  return emit(direction, parent, identity);
};
