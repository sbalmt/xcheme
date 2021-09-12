"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const And = require("./and");
/**
 * Consume the specified input node resolving its 'PIVOT' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns !== void 0) {
        return project.coder.emitPivotPattern(state.identity, patterns[0], ...patterns.slice(1));
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=pivot.js.map