import * as Core from '@xcheme/core';

import * as Project from '../../core/project';
import * as Parser from '../../parser';
import * as Context from '../context';

import { Errors } from '../../core/errors';

/**
 * Consume the export directive for the given node and update the specified state.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns true when the given node is valid for the export directive, false otherwise.
 */
export const consume = (project: Project.Context, node: Core.Node, state: Context.State): boolean => {
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
