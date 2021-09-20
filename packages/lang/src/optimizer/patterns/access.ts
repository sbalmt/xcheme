import * as Core from '@xcheme/core';

import * as Parser from '../../parser';
import * as Identity from '../nodes/identity';
import * as Context from '../context';

import { Errors } from '../../core/errors';
import { Project } from '../../core/project';

/**
 * Determines whether or not the specified map symbol is accessible by a node directive.
 * @param symbol Map symbol.
 * @returns Returns true in case of success, false otherwise.
 */
const isNodeAccessible = (symbol: Core.Record): boolean => {
  return symbol.value === Parser.Symbols.Token || symbol.value === Parser.Symbols.AliasToken;
};

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
  const path = getPath(node);
  const symbol = node.table.find(path[0]);
  const entry = state.references[path.join('@')];
  if (symbol === void 0 || entry === void 0) {
    project.errors.push(new Core.Error(node.fragment, Errors.UNDEFINED_IDENTIFIER));
  } else if (state.type === Context.Types.Token || !isNodeAccessible(symbol)) {
    project.errors.push(new Core.Error(node.fragment, Errors.INVALID_MAP_ENTRY_REFERENCE));
  } else if (entry.dynamic) {
    project.errors.push(new Core.Error(node.fragment, Errors.INVALID_MAP_REFERENCE));
  } else {
    parent.setChild(direction, new Identity.Node(node, entry.identity, entry.dynamic));
  }
};
