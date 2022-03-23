import * as Core from '@xcheme/core';

import * as Nodes from '../../../core/nodes';
import * as Project from '../../../core/project';
import * as Symbols from '../../../core/symbols';
import * as Parser from '../../../parser';
import * as Context from '../../context';

import * as Expression from '../expression';

/**
 * Determines whether or not the given node contains sequential units.
 * @param node Expression node.
 * @param operator Sequential operator type.
 * @returns Returns true when the node is sequential, false otherwise.
 */
const areSequentialUnits = (node: Core.Node, operator: Parser.Nodes): boolean => {
  if (node.value === operator) {
    if (!(node instanceof Nodes.Sequence)) {
      return areSequentialUnits(node.left!, operator) && areSequentialUnits(node.right!, operator);
    }
    return false;
  }
  return node.value === Parser.Nodes.String;
};

/**
 * Determines whether or not the given node contains sequential references.
 * @param node Expression node.
 * @param operator Sequential operator type.
 * @returns Returns true when the node is sequential, false otherwise.
 */
const areSequentialReferences = (node: Core.Node, operator: Parser.Nodes): boolean => {
  if (node.value === operator) {
    if (!(node instanceof Nodes.Sequence)) {
      return areSequentialReferences(node.left!, operator) && areSequentialReferences(node.right!, operator);
    }
    return false;
  }
  return node instanceof Nodes.Reference;
};

/**
 * Emit a new sequence node replacing the current one for an optimized one.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param type Node type.
 */
const emit = (direction: Core.Nodes, parent: Core.Node, type: Parser.Nodes): void => {
  const node = parent.get(direction)!;
  const replacement = new Nodes.Sequence(node, type);
  parent.set(direction, replacement);
};

/**
 * Consume a child node from the AST on the given parent and optimize the sequence pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param type Sequential node type.
 * @param state Context state.
 */
export const consume = (
  project: Project.Context,
  direction: Core.Nodes,
  parent: Core.Node,
  type: Parser.Nodes,
  state: Context.State
): void => {
  const node = parent.get(direction)!;
  if (node.value !== type) {
    Expression.consume(project, direction, parent, state);
  } else if (state.type === Symbols.Types.Node) {
    Expression.consume(project, Core.Nodes.Left, node, state);
    Expression.consume(project, Core.Nodes.Right, node, state);
    if (areSequentialReferences(node, type)) {
      emit(direction, parent, Parser.Nodes.Reference);
    }
  } else {
    if (areSequentialUnits(node, type)) {
      emit(direction, parent, Parser.Nodes.String);
    } else {
      Expression.consume(project, Core.Nodes.Left, node, state);
      Expression.consume(project, Core.Nodes.Right, node, state);
    }
  }
};
