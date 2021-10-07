import * as Core from '@xcheme/core';

import * as Identity from '../../core/nodes/identity';
import * as Project from '../../core/project';
import * as Context from '../context';

import { Errors } from '../../core/errors';

/**
 * Get all fragments from the given access node.
 * @param node Access node.
 * @returns Returns all the extracted path.
 */
const getPath = (node: Core.Node): string[] => {
  if (node.left !== void 0 && node.right !== void 0) {
    return [...getPath(node.left), ...getPath(node.right!)];
  } else if (node.left !== void 0) {
    return getPath(node.left);
  } else if (node.right !== void 0) {
    return getPath(node.right!);
  }
  return [node.fragment.data];
};

/**
 * Consume a child node from the AST on the given parent and optimize the access pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  const node = parent.getChild(direction)!;
  const identifier = getPath(node).join('@');
  if (state.type !== Context.Types.Node || project.nodeEntries.has(identifier)) {
    project.addError(node, Errors.INVALID_MAP_ENTRY_REFERENCE);
  } else {
    const entry = project.tokenEntries.get(identifier);
    if (!entry) {
      project.addError(node, Errors.UNDEFINED_IDENTIFIER);
    } else if (entry.dynamic) {
      project.addError(node, Errors.INVALID_MAP_REFERENCE);
    } else {
      parent.setChild(direction, new Identity.Node(node, entry.identity));
    }
  }
};
