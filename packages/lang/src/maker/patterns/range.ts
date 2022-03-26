import * as Coder from '../../core/coder/base';
import * as Project from '../../core/project';
import * as Types from '../../core/types';
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
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): Coder.Pattern => {
  if (state.directive.type !== Types.Directives.Skip && state.directive.type !== Types.Directives.Token) {
    throw new Exception('The range node can only exists in a token or skip directive.');
  }
  const from = String.extract(node.left!.fragment.data);
  const to = String.extract(node.right!.fragment.data);
  return project.coder.emitRangePattern(from, to);
};
