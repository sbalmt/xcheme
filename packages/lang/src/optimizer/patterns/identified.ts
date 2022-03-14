import * as Core from '@xcheme/core';

import * as Identified from '../../core/nodes/identified';
import * as Project from '../../core/project';
import * as Parser from '../../parser';
import * as Identity from '../identity';
import * as Context from '../context';

import * as Expression from './expression';

/**
 * Consume a child node from the AST on the given parent and optimize the identified pattern.
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
  let identity;
  if (expression.value === Parser.Nodes.State) {
    identity = Identity.resolve(expression);
    Expression.consume(project, Core.Nodes.Right, expression, state);
  } else {
    identity = state.identity;
    Expression.consume(project, Core.Nodes.Right, node, state);
  }
  const replacement = new Identified.Node(node, identity);
  parent.set(Core.Nodes.Right, replacement);
};
