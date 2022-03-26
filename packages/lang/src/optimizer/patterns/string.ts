import * as Core from '@xcheme/core';

import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Context from '../context';

import * as Generic from './generic';

/**
 * Consume a child node from the AST on the given parent and optimize the STRING pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
export const consume = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Types.Node,
  state: Context.State
): void => {
  if (state.type === Types.Directives.Node) {
    const node = parent.get(direction)!;
    const string = node.fragment.data;
    Generic.Loose.consume(project, direction, parent, string, state);
  }
};
