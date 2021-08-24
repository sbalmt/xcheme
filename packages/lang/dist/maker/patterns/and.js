"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = exports.resolve = void 0;
const Parser = require("../../parser");
const String = require("./string");
const Expression = require("./expression");
/**
 * Merge all subsequent occurrences of the 'AND' pattern starting with the given input node.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param units Output units.
 * @param patterns Output patterns.
 * @returns Returns true when the merge consumption was successful, false otherwise.
 */
const merge = (project, node, state, units, patterns) => {
    if (node.value === 209 /* And */) {
        if (node.right.value === 203 /* String */) {
            units.push(String.resolve(project, state, node.right.fragment.data));
            return merge(project, node.left, state, units, patterns);
        }
        const lhs = exports.resolve(project, node.left, state);
        const rhs = exports.resolve(project, node.right, state);
        if (!lhs || !rhs) {
            return false;
        }
        patterns.push(...lhs, ...rhs);
    }
    else {
        if (node.value === 203 /* String */) {
            units.push(String.resolve(project, state, node.fragment.data));
            return true;
        }
        const result = Expression.consume(project, node, state);
        if (!result) {
            return false;
        }
        patterns.push(result);
    }
    if (units.length > 0) {
        patterns.push(project.coder.emitExpectUnitsPattern(units.reverse().flat()));
    }
    return true;
};
/**
 * Resolve the specified input node as an 'AND' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns an array containing all rules or undefined when the pattern is invalid.
 */
const resolve = (project, node, state) => {
    const units = [];
    const patterns = [];
    if (merge(project, node, state, units, patterns)) {
        if (patterns.length > 0) {
            return patterns;
        }
        if (units.length > 0) {
            return [project.coder.emitExpectUnitsPattern(units.reverse().flat())];
        }
    }
    return void 0;
};
exports.resolve = resolve;
/**
 * Consume the specified input node resolving its 'AND' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const patterns = exports.resolve(project, node, state);
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