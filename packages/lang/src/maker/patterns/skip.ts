import * as Nodes from '../../core/nodes';
import * as Project from '../../core/project';
import * as Context from '../context';

import * as Expression from './expression';

/**
 * Consume the specified state making the SKIP directive.
 * @param project Project context.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, state: Context.State): void => {
  const directive = state.directive;
  const expression = Expression.consume(project, directive.right!, state);

  if (expression) {
    const record = Nodes.getRecord(directive);
    record.data.pattern = expression;
  }
};
