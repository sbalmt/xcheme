import * as Core from '@xcheme/core';

import * as Project from '../../core/project';
import * as Context from '../context';

import * as Expression from './expression';

/**
 * Consume the specified state resolving the 'NODE' directive.
 * @param project Project context.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, state: Context.State): void => {
  const directive = state.directive;
  const expression = Expression.consume(project, directive.right!, state);
  if (expression !== void 0) {
    const entry = project.nodeEntries.get(directive.identifier)!;
    if (directive.alias) {
      entry.pattern = expression;
    } else {
      const identity = directive.dynamic ? Core.BaseSource.Output : directive.identity;
      entry.pattern = project.coder.emitNodePattern(identity, Core.Nodes.Right, expression);
      if (entry.references > 0) {
        const identifier = `@REF${entry.identity}`;
        const reference = project.nodeEntries.add(entry.origin, identifier, entry.identity);
        reference.pattern = project.coder.emitReferencePattern(project.nodeEntries, entry.identifier);
      }
    }
  }
};
