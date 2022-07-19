import * as Parser from '@xcheme/parser';

import * as Nodes from '../../core/nodes';
import * as Records from '../../core/records';
import * as Project from '../../core/project';
import * as Types from '../../core/types';
import * as Context from '../context';

import { Errors } from '../../core/errors';

/**
 * Assign the given reference record to the specified reference node.
 * @param node Reference node.
 * @param record Reference record.
 */
const assign = (node: Types.Node, record: Types.Record): void => {
  Types.assignNode(node, {
    type: Types.Nodes.Reference,
    record
  });
};

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
 * @param record Source record.
 * @param nodes Member nodes.
 * @returns Returns the corresponding record or undefined when the path wasn't found.
 */
const getRecord = (project: Project.Context, record: Types.Record, nodes: Types.Node[]): Types.Record | undefined => {
  let member: Types.Record | undefined = record;
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    if (!(member = member.link?.get(node.fragment.data))) {
      project.addError(node.fragment, Errors.UNDEFINED_IDENTIFIER);
      break;
    }
    if (member.assigned) {
      assign(node, member);
    } else {
      const previous = nodes.slice(0, index + 1);
      const identifier = Nodes.getPath([record.node!, ...previous], '@');
      const current = member;
      project.symbols.listen(identifier, () => assign(node, current));
    }
  }
  return member;
};

/**
 * Consume the given node and optimize the ACCESS pattern.
 * @param project Project context.
 * @param node Access node.
 * @param state Consumption state.
 */
export const consume = (project: Project.Context, node: Types.Node, state: Context.State): void => {
  const nodes = getAllNodes(node);
  const [firstNode, ...members] = nodes;
  const firstRecord = node.table.find(firstNode.fragment.data);
  if (!firstRecord) {
    project.addError(firstNode.fragment, Errors.UNDEFINED_IDENTIFIER);
  } else {
    const lastNode = members[members.length - 1];
    const lastRecord = getRecord(project, firstRecord, members);
    if (lastRecord) {
      const identifier = Nodes.getPath(nodes, '@');
      Records.resolve(project, identifier, lastRecord, () => {
        if (state.type !== Types.Directives.Node || lastRecord.data.type === Types.Directives.Node) {
          project.addError(lastNode.fragment, Errors.INVALID_MAP_ENTRY_REFERENCE);
        } else if (Records.isDynamic(lastRecord)) {
          project.addError(lastNode.fragment, Errors.INVALID_MAP_REFERENCE);
        } else if (firstRecord.value === Parser.Symbols.AliasToken) {
          project.addError(firstNode.fragment, Errors.INVALID_MAP_ENTRY_REFERENCE);
        } else {
          Records.connect(firstRecord, state.record!);
        }
      });
    }
  }
};
