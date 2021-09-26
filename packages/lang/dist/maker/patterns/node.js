"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Expression = require("./expression");
/**
 * Consume the specified input node resolving its 'NODE' pattern.
 * @param project Input project.
 * @param directive Directive node.
 */
const consume = (project, directive) => {
    const state = { type: 2 /* Node */, identity: directive.identity, dynamic: directive.dynamic };
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
            const identifier = `@REF${entry.identity}`;
            const reference = project.nodeEntries.add(entry.type, entry.origin, identifier, entry.identity, entry.dynamic);
            reference.pattern = project.coder.emitReferencePattern(project.nodeEntries, entry.identifier);
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=node.js.map