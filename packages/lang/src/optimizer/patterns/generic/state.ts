import * as Core from '@xcheme/core';

import * as Project from '../../../core/project';
import * as Types from '../../../core/types';
import * as Argument from './argument';
import * as Context from '../../context';

import { Errors } from '../../../core/errors';

/**
 * Consume a child node from the AST on the given parent and optimize the state argument pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
export const consume = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Types.Node,
  state: Context.State
): void => {
  const replacement = Argument.consume(project, direction, parent, state);
  if (replacement.dynamic) {
    project.addError(replacement.fragment, Errors.INVALID_AUTO_IDENTITY);
  }
};
