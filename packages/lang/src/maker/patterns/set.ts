import * as Core from '@xcheme/core';

import { Project } from '../../core/project';
import { State } from '../context';

import type { PatternEntry } from '../coder/base';

import * as And from './and';

/**
 * Consume the specified input node resolving its 'SET' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export const consume = (project: Project, node: Core.Node, state: State): PatternEntry | undefined => {
  const param = node.right!;
  const patterns = And.resolve(project, param.right!, state);
  if (patterns !== void 0) {
    const value = parseInt(param.fragment.data);
    return project.coder.emitSetPattern(value, ...patterns);
  }
  return void 0;
};
