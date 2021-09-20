"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = exports.resolve = void 0;
const String = require("../../core/string");
const Mergeable = require("../../optimizer/nodes/mergeable");
const Parser = require("../../parser");
const Expression = require("./expression");
/**
 * Resolve the specified input node as an 'AND' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns an array containing all rules or undefined when the pattern is invalid.
 */
const resolve = (project, node, state) => {
    if (node.value !== 212 /* And */) {
        const pattern = Expression.consume(project, node, state);
        if (pattern !== void 0) {
            return [pattern];
        }
    }
    else if (node instanceof Mergeable.Node) {
        let units;
        if (node.type === 203 /* String */) {
            const words = node.sequence.map((node) => String.extract(node.fragment.data));
            units = words.join('').split('');
        }
        else {
            units = node.sequence.map((node) => node.identity);
        }
        return [project.coder.emitExpectUnitsPattern(units)];
    }
    else {
        const left = exports.resolve(project, node.left, state);
        if (left !== void 0) {
            const right = exports.resolve(project, node.right, state);
            if (right !== void 0) {
                return [...left, ...right];
            }
        }
    }
    return void 0;
};
exports.resolve = resolve;
/**
 * Consume the specified input node resolving its 'AND' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const patterns = exports.resolve(project, node, state);
    if (patterns !== void 0) {
        if (patterns.length > 1) {
            return project.coder.emitExpectPattern(...patterns);
        }
        return patterns[0];
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=and.js.map