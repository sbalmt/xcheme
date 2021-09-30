"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Expression = require("./expression");
/**
 * Emit a new reference entry based on the given node entry.
 * @param project Project context.
 * @param entry Node entry.
 */
const emit = (project, entry) => {
    const identifier = `@REF${entry.identity}`;
    const reference = project.nodeEntries.add(entry.origin, identifier, entry.identity);
    reference.pattern = project.coder.emitReferencePattern(project.nodeEntries, entry.identifier);
};
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
        if (!directive.alias) {
            const identity = directive.dynamic ? Core.BaseSource.Output : directive.identity;
            entry.pattern = project.coder.emitNodePattern(identity, 1 /* Right */, expression);
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
//# sourceMappingURL=node.js.map