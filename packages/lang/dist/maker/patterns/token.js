"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Expression = require("./expression");
/**
 * Emit a new token entry into the given project.
 * @param project Input project.
 * @param identity Token identity.
 * @param name Token name.
 * @param pattern Token pattern.
 * @param type Token type.
 * @param ref Determines whether or not the node is referenced by another one.
 */
const emit = (project, identity, name, pattern, type, ref) => {
    if (ref) {
        const reference = project.coder.getReference(project.tokenPointerEntries, name);
        project.tokenPointerEntries.add(identity, name, pattern, 0 /* Normal */);
        project.tokenEntries.add(identity, name, reference, type);
    }
    else {
        project.tokenEntries.add(identity, name, pattern, type);
    }
};
/**
 * Consume the specified input node resolving its 'TOKEN' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param identity Pattern identity.
 * @param pointer Initial context pointers.
 * @param counter Initial context counter.
 * @param alias Determines whether or not the token is an alias.
 * @returns Returns the consumption state.
 */
const consume = (project, node, identity, pointers, counter, alias) => {
    const state = { identity, pointers, counter, type: 1 /* Token */ };
    const entry = Expression.consume(project, node.right, state);
    if (entry) {
        const name = node.fragment.data;
        const referenced = pointers.has(name);
        if (alias) {
            emit(project, identity, name, entry, 1 /* Alias */, referenced);
        }
        else {
            const pattern = project.coder.getToken(identity, entry);
            emit(project, identity, name, pattern, 0 /* Normal */, referenced);
        }
    }
    return state;
};
exports.consume = consume;
//# sourceMappingURL=token.js.map