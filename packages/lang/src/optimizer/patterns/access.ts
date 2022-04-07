import * as Core from '@xcheme/core';

import * as Nodes from '../../core/nodes';
import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as Types from '../../core/types';
import * as Parser from '../../parser';
import * as Context from '../context';

import { Errors } from '../../core/errors';

/**
 * Get all member nodes from the given ACCESS node.
 * @param node Access node.
 * @returns Returns an array containing all the member nodes.
 */
const getAllNodes = (node: Types.Node): Types.Node[] => {
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
const getRecord = (project: Project.Context, record: Types.Record, nodes: Types.Node[]): Types.Record | undefined => {
  let member: Types.Record | undefined = record;
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
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param source Source record.
 * @param target Target record.
 * @param state Consumption state.
 */
const upgrade = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Types.Node,
  source: Types.Record,
  target: Types.Record,
  state: Context.State
): void => {
  if (state.type !== Types.Directives.Node || target.data.type === Types.Directives.Node) {
    project.addError(target.fragment, Errors.INVALID_MAP_ENTRY_REFERENCE);
  } else if (Symbols.isDynamic(target)) {
    project.addError(target.fragment, Errors.INVALID_MAP_REFERENCE);
  } else if (source.value === Parser.Symbols.AliasToken) {
    project.addError(source.fragment, Errors.INVALID_MAP_ENTRY_REFERENCE);
  } else {
    const node = parent.get(direction)!;
    const { identity } = target.data;
    const replacement = new Nodes.Reference(node, identity);
    parent.set(direction, replacement);
  }
};

/**
 * Find and connect the corresponding reference for the specified record.
 * @param project Project context.
 * @param identifier Reference identifier.
 * @param record Reference record.
 * @param state Consumption state.
 */
const connect = (project: Project.Context, identifier: string, record: Types.Record, state: Context.State): void => {
  const current = state.record!;
  if (record.assigned) {
    current.data.dependencies.push(record);
    record.data.dependents.push(current);
  } else {
    project.symbols.listen(identifier, () => {
      current.data.dependencies.push(record);
      record.data.dependents.push(current);
    });
  }
};

/**
 * Get an identifier from the given nodes.
 * @param nodes Node list.
 * @returns Returns the identifier.
 */
const getIdentifier = (nodes: Types.Node[]): string => {
  const parts = [];
  for (const node of nodes) {
    parts.push(node.fragment.data);
  }
  return parts.join('@');
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
  parent: Types.Node,
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
      const identifier = getIdentifier(nodes);
      connect(project, identifier, first, state);
      if (record.assigned) {
        upgrade(project, direction, parent, first, record, state);
      } else {
        project.symbols.listen(identifier, () => {
          upgrade(project, direction, parent, first, record, state);
        });
      }
    }
  }
};
