import * as Core from '@xcheme/core';

import * as Identified from '../../core/nodes/identified';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Parser from '../../parser';
import * as Splitter from '../splitter';
import * as Context from '../context';

import { Exception } from '../../core/exception';

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
  node: Core.Node,
  state: Context.State,
  direction: Core.Nodes
): Coder.Pattern | undefined => {
  if (!(node instanceof Identified.Node)) {
    throw new Exception('The APPEND node must be an instance of an identified node.');
  }
  const current = state.dynamic;
  state.dynamic = node.dynamic;
  const expression = (node.right!.value === Parser.Nodes.Identity ? node.right!.right : node.right)!;
  const patterns = Splitter.resolve(project, expression, state);
  state.dynamic = current;
  if (patterns) {
    const [test, ...remaining] = patterns;
    return project.coder.emitAppendPattern(node.identity, direction, test, ...remaining);
  }
  return void 0;
};
