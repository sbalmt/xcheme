import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Parser from '../../parser';
import * as Context from '../context';

import { Errors } from '../../core/errors';

/**
 * Consume the EXPORT directive in the given node and replace it by an optimized one.
 * @param project Project context.
 * @param node Directive node.
 * @param state Consumption state.
 * @returns Returns true when the given node was consumed, false otherwise.
 */
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): boolean => {
  const current = node.right!;
  if (current.value === Parser.Nodes.Identifier) {
    const identifier = current.fragment.data;
    const record = node.table.find(identifier);
    if (!record) {
      project.addError(current.fragment, Errors.UNDEFINED_IDENTIFIER);
    } else {
      record.data.exported = true;
      state.record = record;
    }
    return true;
  }
  return false;
};
