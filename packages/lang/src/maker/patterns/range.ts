import * as Coder from '../../core/coder/base';
import * as Nodes from '../../core/nodes';
import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as String from '../../core/string';
import * as Context from '../context';

import { Exception } from '../../core/exception';

/**
 * Consume the given node making the RANGE pattern.
 * @param project Project context.
 * @param node RANGE node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): Coder.Pattern => {
  const { type } = Nodes.getRecord(state.directive).data;
  if (type !== Types.Directives.Skip && type !== Types.Directives.Token) {
    throw new Exception('RANGE node can only exists in a TOKEN or SKIP directive.');
  }
  const from = String.extract(node.left!.fragment.data);
  const to = String.extract(node.right!.fragment.data);
  return project.coder.emitRangePattern(from, to);
};
