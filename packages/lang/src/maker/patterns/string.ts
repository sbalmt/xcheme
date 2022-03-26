import * as Coder from '../../core/coder/base';
import * as String from '../../core/string';
import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Context from '../context';

import { Exception } from '../../core/exception';

/**
 * Consume the given node resolving the string pattern.
 * @param project Project context.
 * @param node String node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): Coder.Pattern => {
  if (state.directive.type !== Types.Directives.Skip && state.directive.type !== Types.Directives.Token) {
    throw new Exception(`The string node can only exists in a token or skip directive.`);
  }
  const units = String.extract(node.fragment.data).split('');
  return project.coder.emitExpectUnitsPattern(units);
};
