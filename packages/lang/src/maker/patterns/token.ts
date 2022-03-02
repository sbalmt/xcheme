import * as Project from '../../core/project';
import * as Context from '../context';

import * as Expression from './expression';

/**
 * Consume the specified state resolving the 'TOKEN' directive.
 * @param project Project context.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, state: Context.State): void => {
  const directive = state.directive;
  const expression = Expression.consume(project, directive.right!, state);
  if (expression) {
    const record = project.symbols.get(directive.identifier)!;
    if (!directive.alias) {
      record.data.pattern = project.coder.emitTokenPattern(directive.identity, expression);
    } else {
      record.data.pattern = expression;
    }
  }
};
