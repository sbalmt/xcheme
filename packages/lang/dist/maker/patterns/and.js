"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = exports.resolve = void 0;
const Parser = require("../../parser");
const Alphabet = require("./alphabet");
const Expression = require("./expression");
/**
 * Merge all subsequent occurrences of the 'AND' pattern starting with the given input node.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param alphabet Output alphabet.
 * @param patterns Output patterns.
 * @returns Returns true when the merge consumption was successful, false otherwise.
 */
const merge = (project, node, state, alphabet, patterns) => {
    let result;
    if (node.value !== 209 /* And */) {
        if (node.value === 225 /* Alphabet */) {
            alphabet.push(Alphabet.resolve(project, state, node.fragment.data));
            return true;
        }
        result = Expression.consume(project, node, state);
    }
    else {
        if (node.right.value === 225 /* Alphabet */) {
            alphabet.push(Alphabet.resolve(project, state, node.right.fragment.data));
            return merge(project, node.left, state, alphabet, patterns);
        }
        const lhs = Expression.consume(project, node.left, state);
        const rhs = Expression.consume(project, node.right, state);
        if (lhs && rhs) {
            result = project.coder.getExpect(lhs, rhs);
        }
    }
    if (result) {
        patterns.push(result);
        if (alphabet.length > 0) {
            patterns.push(project.coder.getExpectAlphabet(alphabet.reverse().flat()));
        }
        return true;
    }
    return false;
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
    const alphabet = [];
    const patterns = [];
    if (merge(project, node, state, alphabet, patterns)) {
        if (patterns.length > 0) {
            return patterns;
        }
        if (alphabet.length > 0) {
            return [project.coder.getExpectAlphabet(alphabet.reverse().flat())];
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
            return project.coder.getExpect(...patterns);
        }
        return patterns[0];
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=and.js.map