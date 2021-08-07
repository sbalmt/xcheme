import * as Core from '@xcheme/core';

import * as Parser from '../../parser';

import { Project } from '../common/project';
import { State } from '../common/context';

import type { PatternEntry } from '../coder/base';

import * as Expression from './expression';

/**
 * Consume the specified input node resolving its condition pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export const consume = (project: Project, node: Core.Node, state: State): PatternEntry | undefined => {
  const test = Expression.consume(project, node.left!, state);
  if (test) {
    const content = node.right!;
    let success, failure;
    if (content.value === Parser.Nodes.Else) {
      success = Expression.consume(project, content.left!, state);
      failure = Expression.consume(project, content.right!, state);
    } else {
      success = Expression.consume(project, content, state);
    }
    if (success) {
      return project.coder.getCondition(test, success, failure);
    }
  }
  return void 0;
};
