"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Expression = require("./expression");
/**
 * Consume the specified input node resolving its 'SKIP' pattern.
 * @param project Input project.
 * @param directive Directive node.
 * @param identity Pattern identity.
 * @param pointer Initial context pointers.
 */
const consume = (project, directive, pointers) => {
    const identity = directive.identity;
    const state = { type: 0 /* Skip */, identity, pointers };
    const expression = Expression.consume(project, directive.right, state);
    if (expression !== void 0) {
        project.skipEntries.add(0 /* Normal */, `@SKIP${identity}`, identity, expression);
    }
};
exports.consume = consume;
//# sourceMappingURL=skip.js.map