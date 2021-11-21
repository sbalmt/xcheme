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
    if (expression !== void 0) {
        const entry = project.nodeEntries.get(directive.identifier);
        if (directive.alias) {
            entry.pattern = expression;
        }
        else {
            const identity = directive.identity;
            entry.pattern = project.coder.emitNodePattern(identity, 1 /* Right */, expression);
            if (entry.references > 0) {
                const identifier = `@${entry.identifier}`;
                const link = project.nodeEntries.create(entry.origin, identifier, entry.identity);
                link.pattern = project.coder.emitReferencePattern(project.nodeEntries, entry.identifier);
                entry.references++;
            }
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=node.js.map