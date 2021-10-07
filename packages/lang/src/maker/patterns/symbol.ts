import * as Core from '@xcheme/core';

import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Splitter from '../resolvers/splitter';
import * as Context from '../context';

/**
 * Consume the given node resolving the 'SYMBOL' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
export const consume = (project: Project.Context, node: Core.Node, state: Context.State): Coder.Pattern | undefined => {
  const patterns = Splitter.resolve(project, node.right!, state);
  if (patterns !== void 0) {
    const directive = state.directive;
    const [test, ...remaining] = patterns;
    return project.coder.emitSymbolPattern(directive.identity, test, ...remaining);
  }
  return void 0;
};
