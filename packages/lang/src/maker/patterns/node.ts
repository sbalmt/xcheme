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
    const record = project.symbols.get(directive.identifier)!;
    if (!directive.alias) {
      record.data.pattern = project.coder.emitNodePattern(directive.identity, Core.Nodes.Right, expression);
    } else {
      record.data.pattern = expression;
    }
  }
};
