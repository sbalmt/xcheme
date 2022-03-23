import * as Core from '@xcheme/core';

import * as Nodes from '../../core/nodes';
import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as Parser from '../../parser';
import * as Context from '../context';

import { Errors } from '../../core/errors';

/**
 * Get all member nodes from the given ACCESS node.
 * @param node Access node.
 * @returns Returns an array containing all the member nodes.
 */
const getAllNodes = (node: Core.Node): Core.Node[] => {
  if (node.left && node.right) {
    return [...getAllNodes(node.left), ...getAllNodes(node.right!)];
  } else if (node.left) {
    return getAllNodes(node.left);
  } else if (node.right) {
    return getAllNodes(node.right!);
  }
  return [node];
};

/**
 * Get the record that corresponds to the path in all the given member nodes.
 * @param project Project context.
 * @param record Base record.
 * @param nodes All members nodes.
 * @returns Returns the corresponding record or undefined when the path wasn't found.
 */
const getRecord = (project: Project.Context, record: Core.Record, nodes: Core.Node[]): Core.Record | undefined => {
  let member: Core.Record | undefined = record;
  for (let index = 1; index < nodes.length; index++) {
    const node = nodes[index];
    if (!(member = member.link?.get(node.fragment.data))) {
      project.addError(node.fragment, Errors.UNDEFINED_IDENTIFIER);
      break;
    }
  }
  return member;
};

/**
 * Emit a new ACCESS node replacing the current one for an optimized one.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param identity Node identity.
 */
const emit = (direction: Core.Nodes, parent: Core.Node, identity: number): void => {
  const node = parent.get(direction)!;
  const replacement = new Nodes.Reference(node, identity);
  parent.set(direction, replacement);
};

/**
 * Consume a child node from the AST on the given parent and optimize the ACCESS pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
export const consume = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Core.Node,
  state: Context.State
): void => {
  const node = parent.get(direction)!;
  const nodes = getAllNodes(node);
  const first = node.table.find(nodes[0].fragment.data);
  if (!first) {
    project.addError(nodes[0].fragment, Errors.UNDEFINED_IDENTIFIER);
  } else {
    const record = getRecord(project, first, nodes);
    if (record) {
      if (state.type !== Symbols.Types.Node || record.data.type === Symbols.Types.Node) {
        project.addError(record.fragment, Errors.INVALID_MAP_ENTRY_REFERENCE);
      } else if (Symbols.isDynamic(record)) {
        project.addError(record.fragment, Errors.INVALID_MAP_REFERENCE);
      } else if (first.value === Parser.Symbols.AliasToken) {
        project.addError(first.fragment, Errors.INVALID_MAP_ENTRY_REFERENCE);
      } else {
        emit(direction, parent, record.data.identity);
      }
    }
  }
};
