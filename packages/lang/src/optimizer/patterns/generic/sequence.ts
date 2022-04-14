import * as Project from '../../../core/project';
import * as Types from '../../../core/types';
import * as Parser from '../../../parser';
import * as Context from '../../context';

import * as Expression from '../expression';

/**
 * Determines whether or not the given node contains a sequence of units.
 * @param node Expression node.
 * @param operator Operator type.
 * @returns Returns true when the node is a sequence, false otherwise.
 */
const isUnitSequence = (node: Types.Node, operator: Parser.Nodes): boolean => {
  if (node.value === operator) {
    if (!(node.assigned && node.data.sequence !== void 0)) {
      return isUnitSequence(node.left!, operator) && isUnitSequence(node.right!, operator);
    }
    return true;
  }
  return node.value === Parser.Nodes.String;
};

/**
 * Determines whether or not the given node contains a sequence of references.
 * @param node Expression node.
 * @param operator Operator type.
 * @returns Returns true when the node is a sequence, false otherwise.
 */
const isReferenceSequence = (node: Types.Node, operator: Parser.Nodes): boolean => {
  if (node.value === operator) {
    if (!(node.assigned && node.data.sequence !== void 0)) {
      return isReferenceSequence(node.left!, operator) && isReferenceSequence(node.right!, operator);
    }
    return true;
  }
  return node.assigned && node.data.type === Types.Nodes.Reference;
};

/**
 * Get all child nodes from the specified node in a sequence of nodes.
 * @param node Expression node.
 * @param operator Operator type.
 * @returns Returns the node sequence.
 */
const getSequence = (node: Types.Node, operator: Parser.Nodes): Types.Node[] => {
  if (node.value === operator) {
    if (!node.assigned || !node.data.sequence) {
      return [...getSequence(node.left!, operator), ...getSequence(node.right!, operator)];
    }
    return node.data.sequence;
  }
  return [node];
};

/**
 * Assign to the given node its corresponding sequence.
 * @param node Sequence node.
 * @param operator Operator type.
 * @param type Sequence type.
 */
const assignSequence = (node: Types.Node, operator: Parser.Nodes, type: Types.Nodes): void => {
  Types.assignNode(node, {
    type: type,
    sequence: getSequence(node, operator)
  });
};

/**
 * Consume the given node as a sequence of units.
 * @param node Expression node.
 * @param operator Operator type.
 */
const consumeUnits = (node: Types.Node, operator: Parser.Nodes): void => {
  if (isUnitSequence(node, operator)) {
    assignSequence(node, operator, Types.Nodes.StringSequence);
  }
};

/**
 * Consume the given node as a sequence of references.
 * @param node Expression node.
 * @param operator Operator type.
 */
const consumeReferences = (node: Types.Node, operator: Parser.Nodes): void => {
  if (isReferenceSequence(node, operator)) {
    assignSequence(node, operator, Types.Nodes.ReferenceSequence);
  }
};

/**
 * Consume the given node and optimize its SEQUENCE pattern.
 * @param project Project context.
 * @param node Expression node.
 * @param operator Operator type.
 * @param state Context state.
 */
export const consume = (
  project: Project.Context,
  node: Types.Node,
  operator: Parser.Nodes,
  state: Context.State
): void => {
  if (node.value !== operator) {
    Expression.consume(project, node, state);
  } else {
    Expression.consume(project, node.left!, state);
    Expression.consume(project, node.right!, state);
    if (state.type === Types.Directives.Node) {
      consumeReferences(node, operator);
    } else {
      consumeUnits(node, operator);
    }
  }
};
