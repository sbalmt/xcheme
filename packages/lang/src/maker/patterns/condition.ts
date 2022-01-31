import * as Core from '@xcheme/core';

import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Parser from '../../parser';
import * as Context from '../context';

import * as Expression from './expression';

/**
 * Consume the given node resolving the condition pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (project: Project.Context, node: Core.Node, state: Context.State): Coder.Pattern | undefined => {
  const test = Expression.consume(project, node.left!, state);
  if (test) {
    const content = node.right!;
    if (content.value === Parser.Nodes.Else) {
      const success = Expression.consume(project, content.left!, state);
      if (success) {
        const failure = Expression.consume(project, content.right!, state);
        if (failure) {
          return project.coder.emitConditionPattern(test, success, failure);
        }
      }
    } else {
      const success = Expression.consume(project, content, state);
      if (success) {
        return project.coder.emitConditionPattern(test, success);
      }
    }
  }
  return void 0;
};
