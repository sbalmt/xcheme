import * as Project from '../../core/project';
import * as Context from '../context';

import * as Expression from './expression';

/**
 * Consume the specified state resolving the 'SKIP' directive.
 * @param project Project context.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, state: Context.State): void => {
  const directive = state.directive;
  const expression = Expression.consume(project, directive.right!, state);
  if (expression !== void 0) {
    const entry = project.skipEntries.get(directive.identifier)!;
    entry.pattern = expression;
  }
};
