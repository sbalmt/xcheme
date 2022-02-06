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
        if (directive.alias) {
            entry.pattern = expression;
        }
        else {
            const identity = directive.identity;
            entry.pattern = project.coder.emitNodePattern(identity, 1 /* Right */, expression);
            if (entry.references > 0) {
                entry.references++;
                const identifier = `@${entry.identifier}`;
                const primary = project.local.create(entry.type, entry.origin, identifier, entry.identity);
                primary.pattern = project.coder.emitReferencePattern(entry);
                primary.dependencies.push(entry);
                entry.primary = primary;
            }
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=node.js.map