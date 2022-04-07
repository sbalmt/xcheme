import * as Core from '@xcheme/core';

import * as Nodes from '../../core/nodes';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Context from '../context';

import { Exception } from '../../core/exception';

import * as Generic from './generic';

/**
 * Consume the given node resolving the 'APPEND' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param direction Append direction.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (
  project: Project.Context,
  node: Types.Node,
  state: Context.State,
  direction: Core.Nodes
): Coder.Pattern | undefined => {
  if (!(node instanceof Nodes.Identity)) {
    throw new Exception('The APPEND node must be an instance of an identified node.');
  }
  const patterns = Generic.Identity.consume(project, node, state);
  if (patterns) {
    const [test, ...remaining] = patterns;
    return project.coder.emitAppendPattern(node.identity, direction, test, ...remaining);
  }
  return void 0;
};
