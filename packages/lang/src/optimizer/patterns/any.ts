import * as Core from '@xcheme/core';

import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as Context from '../context';

import * as Generic from './generic';

/**
 * Consume a child node from the AST on the given parent and optimize the ANY pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
export const consume = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Core.Node,
  state: Context.State
): void => {
  if (state.type === Symbols.Types.Node) {
    Generic.Loose.consume(project, direction, parent, '*', state);
  }
};
