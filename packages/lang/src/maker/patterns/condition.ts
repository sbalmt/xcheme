import * as Core from '@xcheme/core';

import * as Parser from '../../parser';

import { Project } from '../../core/project';
import { State } from '../context';

import type { PatternEntry } from '../coder/base';

import * as Expression from './expression';

/**
 * Consume the specified input node resolving its condition pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export const consume = (project: Project, node: Core.Node, state: State): PatternEntry | undefined => {
  const test = Expression.consume(project, node.left!, state);
  if (test !== void 0) {
    const content = node.right!;
    if (content.value === Parser.Nodes.Else) {
      const success = Expression.consume(project, content.left!, state);
      if (success !== void 0) {
        const failure = Expression.consume(project, content.right!, state);
        if (failure !== void 0) {
          return project.coder.emitConditionPattern(test, success, failure);
        }
      }
    } else {
      const success = Expression.consume(project, content, state);
      if (success !== void 0) {
        return project.coder.emitConditionPattern(test, success);
      }
    }
  }
  return void 0;
};
