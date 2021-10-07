"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Parser = require("../../parser");
const Expression = require("./expression");
/**
 * Consume the given node resolving the condition pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const test = Expression.consume(project, node.left, state);
    if (test !== void 0) {
        const content = node.right;
        if (content.value === 211 /* Else */) {
            const success = Expression.consume(project, content.left, state);
            if (success !== void 0) {
                const failure = Expression.consume(project, content.right, state);
                if (failure !== void 0) {
                    return project.coder.emitConditionPattern(test, success, failure);
                }
            }
        }
        else {
            const success = Expression.consume(project, content, state);
            if (success !== void 0) {
                return project.coder.emitConditionPattern(test, success);
            }
        }
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=condition.js.map