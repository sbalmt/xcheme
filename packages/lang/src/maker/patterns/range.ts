import * as Core from '@xcheme/core';

import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as String from '../../core/string';
import * as Context from '../context';

import { Exception } from '../../core/exception';

/**
 * Consume the given node resolving the range pattern.
 * @param project Project context.
 * @param node Range node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
export const consume = (project: Project.Context, node: Core.Node, state: Context.State): Coder.Pattern => {
  if (state.directive.type !== Symbols.Types.Skip && state.directive.type !== Symbols.Types.Token) {
    throw new Exception('Range nodes can only be in a token or skip directive.');
  }
  const from = String.extract(node.left!.fragment.data);
  const to = String.extract(node.right!.fragment.data);
  return project.coder.emitRangePattern(from, to);
};
