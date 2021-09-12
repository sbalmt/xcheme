import * as Core from '@xcheme/core';

import { Project } from '../../core/project';
import { State } from '../context';

import type { PatternEntry } from '../coder/base';

import * as And from './and';

/**
 * Consume the specified input node resolving its 'APPEND' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param direction Append direction.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export const consume = (project: Project, node: Core.Node, state: State, direction: Core.Nodes): PatternEntry | undefined => {
  const patterns = And.resolve(project, node.right!, state);
  if (patterns !== void 0) {
    return project.coder.emitAppendPattern(state.identity, direction, patterns[0], ...patterns.slice(1));
  }
  return void 0;
};
