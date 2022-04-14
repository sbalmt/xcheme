import * as Nodes from '../../core/nodes';
import * as Records from '../../core/records';
import * as Project from '../../core/project';
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
 * Get the record that corresponds to the path in the given member nodes.
 * @param project Project context.
 * @param source Source record.
 * @param nodes Members nodes.
 * @returns Returns the corresponding record or undefined when the path wasn't found.
 */
const getRecord = (project: Project.Context, source: Types.Record, nodes: Types.Node[]): Types.Record | undefined => {
  let member: Types.Record | undefined = source;
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
 * Upgrade the specified node for an optimized one after resolving its reference.
 * @param project Project context.
 * @param node Access node.
 * @param source Source record.
 * @param target Target record.
 * @param nodes Member nodes.
 * @param state Consumption state.
 */
const upgrade = (
  project: Project.Context,
  node: Types.Node,
  source: Types.Record,
  target: Types.Record,
  nodes: Types.Node[],
  state: Context.State
): void => {
  if (state.type !== Types.Directives.Node || target.data.type === Types.Directives.Node) {
    project.addError(nodes[nodes.length - 1].fragment, Errors.INVALID_MAP_ENTRY_REFERENCE);
  } else if (Records.isDynamic(target)) {
    project.addError(nodes[nodes.length - 1].fragment, Errors.INVALID_MAP_REFERENCE);
  } else if (source.value === Parser.Symbols.AliasToken) {
    project.addError(nodes[0].fragment, Errors.INVALID_MAP_ENTRY_REFERENCE);
  } else {
    Types.assignNode(node, {
      type: Types.Nodes.Reference,
      record: target
    });
  }
};

/**
 * Consume the given node and optimize the ACCESS pattern.
 * @param project Project context.
 * @param node Access node.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): void => {
  const nodes = getAllNodes(node);
  const source = node.table.find(nodes[0].fragment.data);
  if (!source) {
    project.addError(nodes[0].fragment, Errors.UNDEFINED_IDENTIFIER);
  } else {
    const record = getRecord(project, source, nodes);
    if (record) {
      const identifier = Nodes.getPath(nodes, '@');
      Records.connect(project, identifier, source, state.record!);
      if (record.assigned) {
        upgrade(project, node, source, record, nodes, state);
      } else {
        project.symbols.listen(identifier, () => {
          upgrade(project, node, source, record, nodes, state);
        });
      }
    }
  }
};
