"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const And = require("./and");
/**
 * Consume the specified input node resolving its 'HAS' pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const param = node.right;
    const patterns = And.resolve(project, param.right, state);
    if (patterns) {
        const value = parseInt(param.fragment.data);
        return project.coder.emiHasPattern(value, ...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=has.js.map