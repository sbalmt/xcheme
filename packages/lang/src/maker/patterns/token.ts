import * as Nodes from '../../core/nodes';
import * as Records from '../../core/records';
import * as Project from '../../core/project';
import * as Context from '../context';

import * as Expression from './expression';

/**
 * Consume the specified state making the TOKEN directive.
 * @param project Project context.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, state: Context.State): void => {
  const directive = state.directive;
  const record = Nodes.getRecord(directive);
  if (!record.data.template) {
    let expression = Expression.consume(project, directive.right!, state);
    if (expression) {
      if (!Records.isAlias(record)) {
        expression = project.coder.emitTokenPattern(record.data.identity, expression);
      }
      record.data.pattern = expression;
    }
  }
};
