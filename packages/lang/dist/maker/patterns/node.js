"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Expression = require("./expression");
/**
 * Consume the specified state resolving the 'NODE' directive.
 * @param project Project context.
 * @param state Consumption state.
 */
const consume = (project, state) => {
    const directive = state.directive;
    const expression = Expression.consume(project, directive.right, state);
    if (expression) {
        const entry = project.local.get(directive.identifier);
        if (!directive.alias) {
            entry.pattern = project.coder.emitNodePattern(directive.identity, 1 /* Right */, expression);
        }
        else {
            entry.pattern = expression;
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=node.js.map