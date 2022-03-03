"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = void 0;
const Sequential = require("../core/nodes/sequential");
const String = require("../core/string");
const Parser = require("../parser");
const And = require("./patterns/and");
/**
 * Split the first part of the specified sequential node and resolve all the patterns.
 * @param project Project context.
 * @param node Sequential node.
 * @param state Consumption state.
 * @returns Returns an array containing all patterns or undefined when the node is invalid.
 */
const split = (project, node, state) => {
    const record = node.sequence.shift();
    const patterns = And.resolve(project, node, state);
    if (patterns) {
        let units;
        if (node.type === 204 /* String */) {
            units = String.extract(record.fragment.data).split('');
        }
        else {
            units = [record.identity];
        }
        return [project.coder.emitExpectUnitsPattern(units), ...patterns];
    }
    return void 0;
};
/**
 * Traverse the specified node trying to split the first part of the sequential node and resolve all the patterns.
 * @param project Project context.
 * @param node Sequential node.
 * @param state Consumption state.
 * @returns Returns an array containing all patterns or undefined when the node is invalid.
 */
const traverse = (project, node, state) => {
    const left = (0, exports.resolve)(project, node.left, state);
    if (left) {
        const right = (0, exports.resolve)(project, node.right, state);
        if (right) {
            return [...left, ...right];
        }
    }
    return void 0;
};
/**
 * Resolve the given node splitting the first part from the sequential node in an 'AND' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns an array containing all patterns or undefined when the node is invalid.
 */
const resolve = (project, node, state) => {
    if (node.value === 212 /* And */) {
        if (node instanceof Sequential.Node) {
            if (node.sequence.length > 1) {
                return split(project, node, state);
            }
        }
        else {
            return traverse(project, node, state);
        }
    }
    return And.resolve(project, node, state);
};
exports.resolve = resolve;
//# sourceMappingURL=splitter.js.map