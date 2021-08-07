import * as Core from '@xcheme/core';

import { Project } from '../common/project';
import { State } from '../common/context';

import type { PatternEntry } from '../coder/base';

import * as And from './and';

/**
 * Consume the specified input node resolving its 'PIVOT' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export const consume = (project: Project, node: Core.Node, state: State): PatternEntry | undefined => {
  const patterns = And.resolve(project, node.right!, state);
  if (patterns) {
    return project.coder.getPivotNode(state.id, patterns[0], ...patterns.slice(1));
  }
  return void 0;
};
