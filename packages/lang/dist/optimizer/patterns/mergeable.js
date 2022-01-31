"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Identity = require("../../core/nodes/identity");
const Mergeable = require("../../core/nodes/mergeable");
const Parser = require("../../parser");
const Expression = require("./expression");
/**
 * Determines whether or not the given node contains mergeable units.
 * @param node Input node.
 * @param operator Mergeable node type.
 * @returns Returns true when the node is mergeable, false otherwise.
 */
const isMergeableUnits = (node, operator) => {
    if (node.value === operator) {
        if (!(node instanceof Mergeable.Node)) {
            return isMergeableUnits(node.left, operator) && isMergeableUnits(node.right, operator);
        }
        return false;
    }
    return node.value === 204 /* String */;
};
/**
 * Determines whether or not the given node contains mergeable references.
 * @param node Input node.
 * @param operator Mergeable node type.
 * @returns Returns true when the node is mergeable, false otherwise.
 */
const isMergeableRefs = (node, operator) => {
    if (node.value === operator) {
        if (!(node instanceof Mergeable.Node)) {
            return isMergeableRefs(node.left, operator) && isMergeableRefs(node.right, operator);
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
const consume = (project, direction, parent, type, state) => {
    const node = parent.getChild(direction);
    if (node.value !== type) {
        Expression.consume(project, direction, parent, state);
    }
    else if (state.entry.type === 3 /* Node */) {
        Expression.consume(project, 0 /* Left */, node, state);
        Expression.consume(project, 1 /* Right */, node, state);
        if (isMergeableRefs(node, type)) {
            parent.setChild(direction, new Mergeable.Node(node, 201 /* Reference */));
        }
    }
    else {
        if (isMergeableUnits(node, type)) {
            parent.setChild(direction, new Mergeable.Node(node, 204 /* String */));
        }
        else {
            Expression.consume(project, 0 /* Left */, node, state);
            Expression.consume(project, 1 /* Right */, node, state);
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=mergeable.js.map