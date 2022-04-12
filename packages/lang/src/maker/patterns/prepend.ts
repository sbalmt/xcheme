import * as Core from '@xcheme/core';

import * as Coder from '../../core/coder/base';
import * as Nodes from '../../core/nodes';
import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Context from '../context';

import * as Generic from './generic';

/**
 * Consume the given node making the PREPEND pattern.
 * @param project Project context.
 * @param node PREPEND node.
 * @param state Consumption state.
 * @param direction Prepend direction.
 * @returns Returns the consumption result or undefined when the node is invalid.
 */
export const consume = (
  project: Project.Context,
  node: Types.Node,
  state: Context.State,
  direction: Core.Nodes
): Coder.Pattern | undefined => {
  const patterns = Generic.Identity.consume(project, node, state);
  if (patterns) {
    const [test, ...remaining] = patterns;
    const identity = Nodes.getIdentity(node);
    return project.coder.emitPrependPattern(identity, direction, test, ...remaining);
  }
  return void 0;
};
