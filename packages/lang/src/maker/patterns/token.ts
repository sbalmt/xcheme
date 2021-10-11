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
  if (expression !== void 0) {
    const entry = project.tokenEntries.get(directive.identifier)!;
    if (directive.alias) {
      entry.pattern = expression;
    } else {
      const identity = directive.identity;
      entry.pattern = project.coder.emitTokenPattern(identity, expression);
      if (entry.references > 0) {
        const identifier = `@LINK${entry.identity}`;
        const reference = project.tokenEntries.add(entry.origin, identifier, entry.identity);
        reference.pattern = project.coder.emitReferencePattern(project.tokenEntries, entry.identifier);
        entry.references++;
      }
    }
  }
};
