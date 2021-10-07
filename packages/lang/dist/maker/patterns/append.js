"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Splitter = require("../resolvers/splitter");
/**
 * Consume the given node resolving the 'APPEND' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param direction Append direction.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state, direction) => {
    const patterns = Splitter.resolve(project, node.right, state);
    if (patterns !== void 0) {
        const identity = state.directive.identity;
        const [test, ...remaining] = patterns;
        return project.coder.emitAppendPattern(identity, direction, test, ...remaining);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=append.js.map