import * as Core from '@xcheme/core';

import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Context from '../context';

import * as And from './and';

/**
 * Consume the given node resolving the 'PLACE' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param direction Placed node direction.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (
  project: Project.Context,
  node: Core.Node,
  state: Context.State,
  direction: Core.Nodes
): Coder.Pattern | undefined => {
  const patterns = And.resolve(project, node.right!, state);
  if (patterns) {
    return project.coder.emitPlacePattern(direction, ...patterns);
  }
  return void 0;
};
