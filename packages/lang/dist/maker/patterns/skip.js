"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Expression = require("./expression");
/**
 * Consume the specified input node resolving its 'SKIP' pattern.
 * @param project Input project.
 * @param directive Directive node.
 */
const consume = (project, directive) => {
    const identity = directive.identity;
    const state = { type: 0 /* Skip */, identity, dynamic: false };
    const expression = Expression.consume(project, directive.right, state);
    if (expression !== void 0) {
        const entry = project.skipEntries.get(directive.identifier);
        entry.pattern = expression;
    }
};
exports.consume = consume;
//# sourceMappingURL=skip.js.map