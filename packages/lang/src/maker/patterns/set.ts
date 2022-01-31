import * as Core from '@xcheme/core';

import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Context from '../context';

import * as And from './and';

/**
 * Consume the given node resolving the 'SET' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (project: Project.Context, node: Core.Node, state: Context.State): Coder.Pattern | undefined => {
  const param = node.right!;
  const patterns = And.resolve(project, param.right!, state);
  if (patterns) {
    const value = parseInt(param.fragment.data);
    return project.coder.emitSetPattern(value, ...patterns);
  }
  return void 0;
};
