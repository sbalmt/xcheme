"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Expression = require("./expression");
/**
 * Emit a new reference entry based on the given token entry.
 * @param project Project context.
 * @param entry Token entry.
 */
const emit = (project, entry) => {
    const identifier = `@REF${entry.identity}`;
    const reference = project.tokenEntries.add(entry.origin, identifier, entry.identity);
    reference.pattern = project.coder.emitReferencePattern(project.tokenEntries, entry.identifier);
};
/**
 * Consume the specified state resolving the 'TOKEN' directive.
 * @param project Project context.
 * @param state Consumption state.
 */
const consume = (project, state) => {
    const directive = state.directive;
    const expression = Expression.consume(project, directive.right, state);
    if (expression !== void 0) {
        const entry = project.tokenEntries.get(directive.identifier);
        if (!directive.alias) {
            const identity = directive.dynamic ? Core.BaseSource.Output : directive.identity;
            entry.pattern = project.coder.emitTokenPattern(identity, expression);
        }
        else {
            entry.pattern = expression;
        }
        if (entry.references > 0) {
            emit(project, entry);
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=token.js.map