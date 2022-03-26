import * as Core from '@xcheme/core';

import * as Nodes from '../../../core/nodes';
import * as Project from '../../../core/project';
import * as Types from '../../../core/types';
import * as Parser from '../../../parser';
import * as Context from '../../context';

import * as Expression from '../expression';

/**
 * Determines whether or not the given node contain units that's mergeable.
 * @param node Expression node.
 * @param operator Operator type.
 * @returns Returns true when the node is mergeable, false otherwise.
 */
const canMergeUnits = (node: Types.Node, operator: Parser.Nodes): boolean => {
  if (node.value === operator) {
    if (!(node instanceof Nodes.Sequence)) {
      return canMergeUnits(node.left!, operator) && canMergeUnits(node.right!, operator);
    }
    return true;
  }
  return node.value === Parser.Nodes.String;
};

/**
 * Determines whether or not the given node contain references that's mergeable.
 * @param node Expression node.
 * @param operator Operator type.
 * @returns Returns true when the node is mergeable, false otherwise.
 */
const canMergeReferences = (node: Types.Node, operator: Parser.Nodes): boolean => {
  if (node.value === operator) {
    if (!(node instanceof Nodes.Sequence)) {
      return canMergeReferences(node.left!, operator) && canMergeReferences(node.right!, operator);
    }
    return true;
  }
  return node instanceof Nodes.Reference;
};

/**
 * Emit a new sequence node replacing the current one for an optimized one.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param type Node type.
 */
const emit = (direction: Core.Nodes, parent: Types.Node, type: Parser.Nodes): void => {
  const node = parent.get(direction)!;
  const replacement = new Nodes.Sequence(node, type);
  parent.set(direction, replacement);
};

/**
 * Consume a child node from the AST on the given parent and optimize the sequence pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param operator Operator type.
 * @param state Context state.
 */
export const consume = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Types.Node,
  operator: Parser.Nodes,
  state: Context.State
): void => {
  const node = parent.get(direction)!;
  if (node.value !== operator) {
    Expression.consume(project, direction, parent, state);
  } else {
    Expression.consume(project, Core.Nodes.Left, node, state);
    Expression.consume(project, Core.Nodes.Right, node, state);
    if (state.type !== Types.Directives.Node) {
      if (canMergeUnits(node, operator)) {
        emit(direction, parent, Parser.Nodes.String);
      }
    } else {
      if (canMergeReferences(node, operator)) {
        emit(direction, parent, Parser.Nodes.Reference);
      }
    }
  }
};
