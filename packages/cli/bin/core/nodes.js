"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print = void 0;
const Console = require("./console");
const Fragment = require("./fragment");
/**
 * Get the formatted node code.
 * @param node Input node.
 * @returns Returns the formatted node code.
 */
const getCode = (node) => {
    return node.value.toString();
};
/**
 * Get the prefix for the given node.
 * @param dir Node direction.
 * @param node Input node.
 * @param inner Determines whether or not this is an inner node.
 * @returns Returns the corresponding entry.
 */
const getPrefix = (dir, node, inner) => {
    if ((dir === 'L' && (node.right || (node.next && !inner))) ||
        (dir === 'R' && node.next && inner) ||
        (dir === 'N' && node.next?.next && !inner)) {
        return '├─ ';
    }
    return '└─ ';
};
/**
 * Get the indentation for the given tree.
 * @param dir Tree direction.
 * @param node Tree node.
 * @param inner Determines whether or not this is an inner tree.
 * @returns Returns the corresponding indentation.
 */
const getIndent = (dir, node, inner) => {
    if ((dir === 'L' && (node.right || (node.next && !inner))) ||
        (dir === 'R' && node.next && inner) ||
        (dir === 'N' && node.next?.next && !inner)) {
        return '│  ';
    }
    return '   ';
};
/**
 * Print recursively the specified node and all its children in a tree format.
 * @param dir Node direction.
 * @param parent Parent node.
 * @param node Current node.
 * @param prefix Current prefix.
 * @param inner Determines whether or not this is an inner tree.
 */
const printTree = (dir, parent, node, prefix, inner) => {
    const fragment = Fragment.getMessage(node.fragment);
    const location = Fragment.getLocation(node.fragment);
    const entry = parent ? getPrefix(dir, parent, inner) : '';
    Console.printLine(` ${location} ${prefix}${entry}${dir} ${getCode(node)} "${fragment}"`);
    if (parent) {
        prefix += getIndent(dir, parent, inner);
    }
    if (node.left) {
        printTree('L', node, node.left, prefix, true);
    }
    if (node.right) {
        printTree('R', node, node.right, prefix, true);
    }
    if (node.next && inner) {
        printList(node, node, prefix);
    }
};
/**
 * Print recursively the specified node and all its children in a list format.
 * @param parent Parent node.
 * @param node Current node.
 * @param prefix Current prefix.
 */
const printList = (parent, node, prefix) => {
    while ((node = node.next)) {
        printTree('N', parent, node, prefix, false);
        if (parent) {
            parent = node;
        }
    }
};
/**
 * Print a tree for the specified node.
 * @param node Input node.
 */
const print = (node) => {
    Console.printLine('Nodes:\n');
    printList(void 0, node, '');
    Console.printLine('');
};
exports.print = print;
//# sourceMappingURL=nodes.js.map