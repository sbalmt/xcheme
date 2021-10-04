import * as Core from '@xcheme/core';

import * as Identity from '../../core/nodes/identity';
import * as Mergeable from '../../core/nodes/mergeable';
import * as Project from '../../core/project';
import * as Parser from '../../parser';
import * as Context from '../context';

import * as Expression from './expression';

/**
 * Determines whether or not the given node contains mergeable units.
 * @param node Input node.
 * @param operator Mergeable node type.
 * @returns Returns true when the node is mergeable, false otherwise.
 */
const isMergeableUnits = (node: Core.Node, operator: Parser.Nodes): boolean => {
  if (node.value === operator) {
    if (!(node instanceof Mergeable.Node)) {
      return isMergeableUnits(node.left!, operator) && isMergeableUnits(node.right!, operator);
    }
    return false;
  }
  return node.value === Parser.Nodes.String;
};

/**
 * Determines whether or not the given node contains mergeable references.
 * @param node Input node.
 * @param operator Mergeable node type.
 * @returns Returns true when the node is mergeable, false otherwise.
 */
const isMergeableRefs = (node: Core.Node, operator: Parser.Nodes): boolean => {
  if (node.value === operator) {
    if (!(node instanceof Mergeable.Node)) {
      return isMergeableRefs(node.left!, operator) && isMergeableRefs(node.right!, operator);
    }
    return false;
  }
  return node instanceof Identity.Node;
};

/**
 * Consume a child node from the AST on the given parent and optimize the mergeable pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param type Mergeable node type.
 * @param state Context state.
 */
export const consume = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Core.Node,
  type: Parser.Nodes,
  state: Context.State
): void => {
  const node = parent.getChild(direction)!;
  if (node.value !== type) {
    Expression.consume(project, direction, parent, state);
  } else if (state.type === Context.Types.Node) {
    Expression.consume(project, Core.Nodes.Left, node, state);
    Expression.consume(project, Core.Nodes.Right, node, state);
    if (isMergeableRefs(node, type)) {
      parent.setChild(direction, new Mergeable.Node(node, Parser.Nodes.Reference));
    }
  } else {
    if (isMergeableUnits(node, type)) {
      parent.setChild(direction, new Mergeable.Node(node, Parser.Nodes.String));
    } else {
      Expression.consume(project, Core.Nodes.Left, node, state);
      Expression.consume(project, Core.Nodes.Right, node, state);
    }
  }
};
