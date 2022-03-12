import * as Core from '@xcheme/core';

import * as Identified from '../../core/nodes/identified';
import * as Project from '../../core/project';
import * as Symbols from '../../core/symbols';
import * as Parser from '../../parser';
import * as Context from '../context';

import { Errors } from '../../core/errors';

/**
 * Get all nodes from the given access node.
 * @param node Access node.
 * @returns Returns an array containing all nodes.
 */
const getNodes = (node: Core.Node): Core.Node[] => {
  if (node.left && node.right) {
    return [...getNodes(node.left), ...getNodes(node.right!)];
  } else if (node.left) {
    return getNodes(node.left);
  } else if (node.right) {
    return getNodes(node.right!);
  }
  return [node];
};

/**
 * Get the member record that corresponds to the specified nodes containing a member path.
 * @param project Project context.
 * @param base Base record.
 * @param nodes Node list containing the member path.
 * @returns Returns the corresponding member record or undefined when the member wasn't found.
 */
const getMember = (project: Project.Context, base: Core.Record, nodes: Core.Node[]): Core.Record | undefined => {
  let member: Core.Record | undefined = base;
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
 * Consume a child node from the AST on the given parent and optimize the access pattern.
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
  const nodes = getNodes(node);
  const first = node.table.find(nodes[0].fragment.data);
  if (!first) {
    project.addError(nodes[0].fragment, Errors.UNDEFINED_IDENTIFIER);
  } else {
    const member = getMember(project, first, nodes);
    if (member) {
      if (state.type !== Symbols.Types.Node || member.data.type === Symbols.Types.Node) {
        project.addError(member.node!.fragment, Errors.INVALID_MAP_ENTRY_REFERENCE);
      } else if (Symbols.isDynamic(member)) {
        project.addError(member.node!.fragment, Errors.INVALID_MAP_REFERENCE);
      } else if (first.value === Parser.Symbols.AliasToken) {
        project.addError(first.node!.fragment, Errors.INVALID_MAP_ENTRY_REFERENCE);
      } else {
        parent.set(direction, new Identified.Node(node, member.data.identity));
      }
    }
  }
};
