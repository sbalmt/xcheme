import * as Nodes from '../../../core/nodes';
import * as Project from '../../../core/project';
import * as Types from '../../../core/types';
import * as Argument from './argument';
import * as Context from '../../context';

import { Errors } from '../../../core/errors';

/**
 * Consume the given node and optimize the STATE pattern.
 * @param project Project context.
 * @param node State node.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): void => {
  Argument.consume(project, node, state);
  if (Nodes.isDynamic(node)) {
    project.addError(node.fragment, Errors.INVALID_AUTO_IDENTITY);
  }
};
