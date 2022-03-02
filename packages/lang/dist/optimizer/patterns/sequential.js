"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Sequential = require("../../core/nodes/sequential");
const Identified = require("../../core/nodes/identified");
const Parser = require("../../parser");
const Expression = require("./expression");
/**
 * Determines whether or not the given node contains sequential units.
 * @param node Input node.
 * @param operator Sequential node type.
 * @returns Returns true when the node is sequential, false otherwise.
 */
const areSequentialUnits = (node, operator) => {
    if (node.value === operator) {
        if (!(node instanceof Sequential.Node)) {
            return areSequentialUnits(node.left, operator) && areSequentialUnits(node.right, operator);
        }
        return false;
    }
    return node.value === 204 /* String */;
};
/**
 * Determines whether or not the given node contains sequential references.
 * @param node Input node.
 * @param operator Sequential node type.
 * @returns Returns true when the node is sequential, false otherwise.
 */
const areSequentialReferences = (node, operator) => {
    if (node.value === operator) {
        if (!(node instanceof Sequential.Node)) {
            return areSequentialReferences(node.left, operator) && areSequentialReferences(node.right, operator);
        }
        return false;
    }
    return node instanceof Identified.Node;
};
/**
 * Consume a child node from the AST on the given parent and optimize the sequential pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param type Sequential node type.
 * @param state Context state.
 */
const consume = (project, direction, parent, type, state) => {
    const node = parent.getChild(direction);
    if (node.value !== type) {
        Expression.consume(project, direction, parent, state);
    }
    else if (state.type === 3 /* Node */) {
        Expression.consume(project, 0 /* Left */, node, state);
        Expression.consume(project, 1 /* Right */, node, state);
        if (areSequentialReferences(node, type)) {
            parent.setChild(direction, new Sequential.Node(node, 201 /* Reference */));
        }
    }
    else {
        if (areSequentialUnits(node, type)) {
            parent.setChild(direction, new Sequential.Node(node, 204 /* String */));
        }
        else {
            Expression.consume(project, 0 /* Left */, node, state);
            Expression.consume(project, 1 /* Right */, node, state);
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=sequential.js.map