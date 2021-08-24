import * as Core from '@xcheme/core';

import { Project } from '../common/project';
import { State } from '../common/context';

import type { PatternEntry } from '../coder/base';

import * as And from './and';

/**
 * Consume the specified input node resolving its 'ERROR' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export const consume = (project: Project, node: Core.Node, state: State): PatternEntry | undefined => {
  const param = node.right!;
  const patterns = And.resolve(project, param.right!, state);
  if (patterns) {
    const value = parseInt(param.fragment.data);
    return project.coder.emitErrorPattern(value, ...patterns);
  }
  return void 0;
};
