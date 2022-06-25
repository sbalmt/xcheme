import * as Parser from '@xcheme/parser';

import * as Project from '../../core/project';
import * as Types from '../../core/types';

import { Errors } from '../../core/errors';

/**
 * Consume the given node and optimize the EXPORT pattern.
 * @param project Project context.
 * @param node Directive node.
 * @returns Returns true when the given node was consumed, false otherwise.
 */
export const consume = (project: Project.Context, node: Types.Node): boolean => {
  const current = node.right!;
  if (current.value === Parser.Nodes.Identifier) {
    const identifier = current.fragment.data;
    const record = node.table.find(identifier);
    if (!record) {
      project.addError(current.fragment, Errors.UNDEFINED_IDENTIFIER);
    } else {
      record.data.exported = true;
    }
    return true;
  }
  return false;
};
