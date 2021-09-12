"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Expression = require("./expression");
/**
 * Emit a new token entry into the given project.
 * @param project Input project.
 * @param type Token type.
 * @param name Token name.
 * @param identity Token identity.
 * @param pattern Token pattern.
 * @param ref Determines whether or not the node is referenced by another one.
 */
const emit = (project, type, name, identity, pattern, ref) => {
    if (ref) {
        const reference = project.coder.emitReferencePattern(project.tokenPointerEntries, name);
        project.tokenPointerEntries.add(0 /* Normal */, name, identity, pattern);
        project.tokenEntries.add(type, name, identity, reference);
    }
    else {
        project.tokenEntries.add(type, name, identity, pattern);
    }
};
/**
 * Consume the specified input node resolving its 'TOKEN' pattern.
 * @param project Input project.
 * @param directive Directive node.
 * @param pointer Initial context pointers.
 * @param alias Determines whether or not the token is an alias.
 */
const consume = (project, directive, pointers, alias) => {
    const identity = directive.identity;
    const state = { type: 1 /* Token */, identity, pointers };
    const expression = Expression.consume(project, directive.right, state);
    if (expression !== void 0) {
        const identifier = directive.fragment.data;
        const referenced = pointers.has(identifier);
        if (alias) {
            emit(project, 1 /* Alias */, identifier, identity, expression, referenced);
        }
        else {
            const pattern = project.coder.emitTokenPattern(identity, expression);
            emit(project, 0 /* Normal */, identifier, identity, pattern, referenced);
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=token.js.map