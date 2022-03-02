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
        const record = project.symbols.get(directive.identifier);
        if (!directive.alias) {
            record.data.pattern = project.coder.emitNodePattern(directive.identity, 1 /* Right */, expression);
        }
        else {
            record.data.pattern = expression;
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=node.js.map