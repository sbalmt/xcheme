import * as Core from '@xcheme/core';

import * as Identity from '../nodes/identity';
import * as Context from '../context';

import { Errors } from '../../core/errors';
import { Project } from '../../core/project';

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
 * Consume the specified input node resolving its access pattern.
 * @param project Input project.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
export const consume = (project: Project, direction: Core.Nodes, parent: Core.Node, state: Context.State): void => {
  const node = parent.getChild(direction)!;
  const identifier = getPath(node).join('@');
  if (state.type !== Context.Types.Node || project.nodeEntries.has(identifier)) {
    project.errors.push(new Core.Error(node.fragment, Errors.INVALID_MAP_ENTRY_REFERENCE));
  } else {
    const entry = project.tokenEntries.get(identifier);
    if (!entry) {
      project.errors.push(new Core.Error(node.fragment, Errors.UNDEFINED_IDENTIFIER));
    } else if (entry.dynamic) {
      project.errors.push(new Core.Error(node.fragment, Errors.INVALID_MAP_REFERENCE));
    } else {
      parent.setChild(direction, new Identity.Node(node, entry.identity, entry.dynamic));
    }
  }
};
