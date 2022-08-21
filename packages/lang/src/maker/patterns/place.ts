import * as Core from '@xcheme/core';

import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Context from '../context';

import * as And from './and';

/**
 * Consume the given node making the PLACE pattern.
 * @param project Project context.
 * @param node PLACE node.
 * @param state Consumption state.
 * @param direction Place direction.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (
  project: Project.Context,
  node: Types.Node,
  state: Context.State,
  direction: Core.NodeDirection
): Coder.Pattern | undefined => {
  const patterns = And.resolve(project, node.right!, state);
  if (patterns) {
    return project.coder.emitPlacePattern(direction, ...patterns);
  }
  return void 0;
};
