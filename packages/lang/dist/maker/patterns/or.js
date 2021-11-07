"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = exports.resolve = void 0;
const Mergeable = require("../../core/nodes/mergeable");
const String = require("../../core/string");
const Parser = require("../../parser");
const Expression = require("./expression");
/**
 * Resolve the given node as an 'OR' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns an array containing all patterns or undefined when the node is invalid.
 */
const resolve = (project, node, state) => {
    if (node.value !== 211 /* Or */) {
        const pattern = Expression.consume(project, node, state);
        if (pattern !== void 0) {
            return [pattern];
        }
    }
    else if (node instanceof Mergeable.Node) {
        if (node.type === 204 /* String */) {
            const fragments = node.sequence.map((node) => String.extract(node.fragment.data));
            if (fragments.length > 3 || fragments.find((fragment) => fragment.length > 1) !== void 0) {
                const routes = fragments.map((fragment) => project.coder.getRoute(fragment.split('')));
                return [project.coder.emitMapPattern(...routes)];
            }
            return [project.coder.emitChooseUnitsPattern(fragments)];
        }
        else {
            const units = node.sequence.map((node) => node.identity);
            if (units.length > 3) {
                const routes = units.map((unit) => project.coder.getRoute([unit]));
                return [project.coder.emitMapPattern(...routes)];
            }
            return [project.coder.emitChooseUnitsPattern(units)];
        }
    }
    else {
        const left = (0, exports.resolve)(project, node.left, state);
        if (left !== void 0) {
            const right = (0, exports.resolve)(project, node.right, state);
            if (right !== void 0) {
                return [...left, ...right];
            }
        }
    }
    return void 0;
};
exports.resolve = resolve;
/**
 * Consume the given node resolving the 'OR' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const patterns = (0, exports.resolve)(project, node, state);
    if (patterns !== void 0) {
        if (patterns.length > 1) {
            return project.coder.emitChoosePattern(...patterns);
        }
        return patterns[0];
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=or.js.map