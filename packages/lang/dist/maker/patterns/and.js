"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = exports.resolve = void 0;
const Mergeable = require("../../core/nodes/mergeable");
const String = require("../../core/string");
const Parser = require("../../parser");
const Expression = require("./expression");
/**
 * Resolve the given input node as an 'AND' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns an array containing all rules or undefined when the pattern is invalid.
 */
const resolve = (project, node, state) => {
    if (node.value !== 212 /* And */) {
        const pattern = Expression.consume(project, node, state);
        if (pattern) {
            return [pattern];
        }
    }
    else if (node instanceof Mergeable.Node) {
        let units;
        if (node.type === 204 /* String */) {
            const words = node.sequence.map((node) => String.extract(node.fragment.data));
            units = words.join('').split('');
        }
        else {
            units = node.sequence.map((node) => node.identity);
        }
        return [project.coder.emitExpectUnitsPattern(units)];
    }
    else {
        const left = (0, exports.resolve)(project, node.left, state);
        if (left) {
            const right = (0, exports.resolve)(project, node.right, state);
            if (right) {
                return [...left, ...right];
            }
        }
    }
    return void 0;
};
exports.resolve = resolve;
/**
 * Consume the given node resolving the 'AND' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const patterns = (0, exports.resolve)(project, node, state);
    if (patterns) {
        if (patterns.length > 1) {
            return project.coder.emitExpectPattern(...patterns);
        }
        return patterns[0];
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=and.js.map