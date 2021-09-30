"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const And = require("./and");
/**
 * Consume the given node resolving the 'PIVOT' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns !== void 0) {
        const identity = state.directive.identity;
        return project.coder.emitPivotPattern(identity, patterns[0], ...patterns.slice(1));
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=pivot.js.map