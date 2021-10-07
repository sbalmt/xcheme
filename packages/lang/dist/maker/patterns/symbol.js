"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const And = require("./and");
/**
 * Consume the given node resolving the 'SYMBOL' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns !== void 0) {
        const [test, ...remaining] = patterns;
        const directive = state.directive;
        return project.coder.emitSymbolPattern(directive.identity, test, ...remaining);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=symbol.js.map