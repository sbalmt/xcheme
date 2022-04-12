import * as Project from '../../../core/project';
import * as Types from '../../../core/types';
import * as Parser from '../../../parser';
import * as Identity from '../../identity';
import * as Context from '../../context';

import * as Expression from '../expression';

/**
 * Consume the given node and optimize the ARGUMENT pattern.
 * @param project Project context.
 * @param node Argument node.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): void => {
  const expression = node.right!;
  if (expression.value !== Parser.Nodes.Arguments) {
    Expression.consume(project, node.right!, state);
    node.assign({
      type: Types.Nodes.Argument,
      identity: state.identity
    });
  } else {
    Expression.consume(project, expression.right!, state);
    node.assign({
      type: Types.Nodes.Argument,
      identity: Identity.consume(project, expression, state, state.identity)
    });
  }
};
