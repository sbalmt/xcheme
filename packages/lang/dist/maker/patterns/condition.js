"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Parser = require("../../parser");
const Expression = require("./expression");
/**
 * Consume the specified input node resolving its condition pattern.
 * It can also update the given project and context state during the consumption.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const test = Expression.consume(project, node.left, state);
    if (test) {
        const content = node.right;
        let success, failure;
        if (content.value === 207 /* Else */) {
            success = Expression.consume(project, content.left, state);
            failure = Expression.consume(project, content.right, state);
        }
        else {
            success = Expression.consume(project, content, state);
        }
        if (success) {
            return project.coder.getCondition(test, success, failure);
        }
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=condition.js.map