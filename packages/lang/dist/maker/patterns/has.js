"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const And = require("./and");
/**
 * Consume the given node resolving the 'HAS' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const param = node.right;
    const patterns = And.resolve(project, param.right, state);
    if (patterns) {
        const value = parseInt(param.fragment.data);
        return project.coder.emitHasPattern(value, ...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=has.js.map