import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Context from '../context';

import * as Generic from './generic';

/**
 * Consume the given node and optimize the RANGE pattern.
 * @param project Project context.
 * @param node Range node.
 * @param state Context state.
 */
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): void => {
  if (state.type === Types.Directives.Node) {
    const range = `${node.left!.fragment.data}-${node.right!.fragment.data}`;
    Generic.Loose.consume(project, node, range, state);
  }
};
