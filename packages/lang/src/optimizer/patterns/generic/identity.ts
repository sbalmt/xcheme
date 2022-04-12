import * as Nodes from '../../../core/nodes';
import * as Project from '../../../core/project';
import * as Symbols from '../../../core/symbols';
import * as Types from '../../../core/types';
import * as Argument from './argument';
import * as Context from '../../context';

import { Errors } from '../../../core/errors';

/**
 * Consume the given parent and optimize the IDENTITY pattern.
 * @param project Project context.
 * @param node Identity node.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): void => {
  const record = state.record!;
  Argument.consume(project, node, state);
  if (Symbols.isEmpty(record) && Nodes.isEmpty(node)) {
    project.addError(node.fragment, Errors.UNDEFINED_IDENTITY);
    if (record.data.type !== Types.Directives.Skip) {
      project.addError(record.fragment, Errors.UNDEFINED_IDENTITY);
    }
  }
};
