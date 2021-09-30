import * as Core from '@xcheme/core';

import * as Project from '../../core/project';
import * as Entries from '../../core/entries';
import * as Context from '../context';

import * as Expression from './expression';

/**
 * Emit a new reference entry based on the given token entry.
 * @param project Project context.
 * @param entry Token entry.
 */
const emit = (project: Project.Context, entry: Entries.Entry): void => {
  const identifier = `@REF${entry.identity}`;
  const reference = project.tokenEntries.add(entry.origin, identifier, entry.identity);
  reference.pattern = project.coder.emitReferencePattern(project.tokenEntries, entry.identifier);
};

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
    if (!directive.alias) {
      const identity = directive.dynamic ? Core.BaseSource.Output : directive.identity;
      entry.pattern = project.coder.emitTokenPattern(identity, expression);
    } else {
      entry.pattern = expression;
    }
    if (entry.references > 0) {
      emit(project, entry);
    }
  }
};
