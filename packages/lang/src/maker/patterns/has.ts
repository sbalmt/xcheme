import * as Core from '@xcheme/core';

import * as Identified from '../../core/nodes/identified';
import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Context from '../context';

import { Exception } from '../../core/exception';

import * as And from './and';

/**
 * Consume the given node resolving the 'HAS' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (project: Project.Context, node: Core.Node, state: Context.State): Coder.Pattern | undefined => {
  if (!(node instanceof Identified.Node)) {
    throw new Exception('The HAS node must be an instance of an identified node.');
  }
  const expression = node.right!;
  const patterns = And.resolve(project, expression.right!, state);
  if (patterns) {
    return project.coder.emitHasPattern(node.identity, ...patterns);
  }
  return void 0;
};
