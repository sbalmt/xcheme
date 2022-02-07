"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const And = require("./and");
/**
 * Consume the given node resolving the 'UNCASE' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns) {
        return project.coder.emitUncasePattern(...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=uncase.js.map