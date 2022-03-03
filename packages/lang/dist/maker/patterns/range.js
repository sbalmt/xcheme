"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const String = require("../../core/string");
const exception_1 = require("../../core/exception");
/**
 * Consume the given node resolving the range pattern.
 * @param project Project context.
 * @param node Range node.
 * @param state Consumption state.
 * @returns Returns the resolved pattern.
 * @throws Throws an exception when the given node isn't valid.
 */
const consume = (project, node, state) => {
    if (state.directive.type !== 1 /* Skip */ && state.directive.type !== 2 /* Token */) {
        throw new exception_1.Exception('Range nodes can only be in a token or skip directive.');
    }
    const from = String.extract(node.left.fragment.data);
    const to = String.extract(node.right.fragment.data);
    return project.coder.emitRangePattern(from, to);
};
exports.consume = consume;
//# sourceMappingURL=range.js.map