"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const And = require("./and");
/**
 * Consume the specified input node resolving its 'SET' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const param = node.right;
    const patterns = And.resolve(project, param.right, state);
    if (patterns !== void 0) {
        const value = parseInt(param.fragment.data);
        return project.coder.emitSetPattern(value, ...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=set.js.map