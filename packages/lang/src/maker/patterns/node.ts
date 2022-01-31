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
  if (expression) {
    const entry = project.local.get(directive.identifier)!;
    if (directive.alias) {
      entry.pattern = expression;
    } else {
      const identity = directive.identity;
      entry.pattern = project.coder.emitNodePattern(identity, Core.Nodes.Right, expression);
      if (entry.references > 0) {
        entry.references++;
        const identifier = `@${entry.identifier}`;
        const link = project.local.create(entry.type, entry.origin, identifier, entry.identity);
        link.pattern = project.coder.emitReferencePattern(entry);
        link.dependencies.push(entry);
        entry.dependents.push(link);
      }
    }
  }
};
