"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Expression = require("./expression");
/**
 * Consume the specified state resolving the 'SKIP' directive.
 * @param project Project context.
 * @param state Consumption state.
 */
const consume = (project, state) => {
    const directive = state.directive;
    const expression = Expression.consume(project, directive.right, state);
    if (expression) {
        const entry = project.local.get(directive.identifier);
        entry.pattern = expression;
    }
};
exports.consume = consume;
//# sourceMappingURL=skip.js.map