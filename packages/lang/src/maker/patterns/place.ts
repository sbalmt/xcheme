import * as Core from '@xcheme/core';

import { Project } from '../../core/project';
import { State } from '../context';

import type { PatternEntry } from '../coder/base';

import * as And from './and';

/**
 * Consume the specified input node resolving its 'PLACE' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param direction Placed node direction.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
export const consume = (project: Project, node: Core.Node, state: State, direction: Core.Nodes): PatternEntry | undefined => {
  const patterns = And.resolve(project, node.right!, state);
  if (patterns !== void 0) {
    return project.coder.emitPlacePattern(direction, ...patterns);
  }
  return void 0;
};
