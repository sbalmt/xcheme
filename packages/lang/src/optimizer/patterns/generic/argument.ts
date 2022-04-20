import * as Project from '../../../core/project';
import * as Types from '../../../core/types';
import * as Parser from '../../../parser';
import * as Identity from '../../identity';
import * as Context from '../../context';

import * as Expression from '../expression';

/**
 * Assign to the given node its corresponding argument identity.
 * @param node Argument node.
 * @param identity Argument identity.
 */
const assign = (node: Types.Node, identity: number): void => {
  Types.assignNode(node, {
    type: Types.Nodes.Argument,
    identity
  });
};

/**
 * Consume the given node and optimize its ARGUMENT pattern.
 * @param project Project context.
 * @param node Argument node.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): void => {
  const expression = node.right!;
  const { identity, template } = state.record!.data;
  if (expression.value === Parser.Nodes.Arguments) {
    Expression.consume(project, expression.right!, state);
    assign(node, Identity.consume(project, expression, template, identity));
  } else {
    Expression.consume(project, expression, state);
    assign(node, identity);
  }
};
