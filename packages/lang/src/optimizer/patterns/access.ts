import * as Core from '@xcheme/core';

import * as Identity from '../../core/nodes/identity';
import * as Entries from '../../core/entries';
import * as Project from '../../core/project';
import * as Context from '../context';

import { Errors } from '../../core/errors';

/**
 * Get all fragments from the given access node.
 * @param node Access node.
 * @returns Returns all the extracted path.
 */
const getPath = (node: Core.Node): string[] => {
  if (node.left && node.right) {
    return [...getPath(node.left), ...getPath(node.right!)];
  } else if (node.left) {
    return getPath(node.left);
  } else if (node.right) {
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
  const path = getPath(node);
  const identifier = path.join('@');
  if (state.entry.type !== Entries.Types.Node || project.local.get(identifier)?.type === Entries.Types.Node) {
    project.addError(node, Errors.INVALID_MAP_ENTRY_REFERENCE);
  } else {
    const directive = project.local.get(path[0]);
    const member = project.local.get(identifier);
    if (!directive || !member) {
      project.addError(node, Errors.UNDEFINED_IDENTIFIER);
    } else if (member.dynamic) {
      project.addError(node, Errors.INVALID_MAP_REFERENCE);
    } else if (directive.alias) {
      project.addError(node, Errors.INVALID_MAP_ENTRY_REFERENCE);
    } else {
      parent.setChild(direction, new Identity.Node(node, member.identity));
    }
  }
};
