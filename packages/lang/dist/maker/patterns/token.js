"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Expression = require("./expression");
/**
 * Emit a new token entry into the given project.
 * @param project Input project.
 * @param id Node Id.
 * @param name Node name.
 * @param pattern Node pattern.
 * @param type Node type.
 * @param referenced Determines whether or not the node is referenced by another one.
 */
const emit = (project, id, name, pattern, type, referenced) => {
    if (referenced) {
        const reference = project.coder.getReference(project.tokenPointerEntries, name);
        project.tokenPointerEntries.add(id, name, pattern, 0 /* Normal */);
        project.tokenEntries.add(id, name, reference, type);
    }
    else {
        project.tokenEntries.add(id, name, pattern, type);
    }
};
/**
 * Consume the specified input node resolving its 'TOKEN' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param pointer Initial context pointers.
 * @param counter Initial context counters.
 * @param alias Determines whether or not the token is an alias.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, pointers, counters, alias) => {
    const id = counters.token;
    const entry = Expression.consume(project, node.right, { id, pointers, counters, type: 1 /* Token */ });
    if (entry) {
        const name = node.fragment.data;
        const referenced = pointers.has(name);
        if (alias) {
            emit(project, id, name, entry, 1 /* Alias */, referenced);
        }
        else {
            const pattern = project.coder.getToken(id, entry);
            emit(project, id, name, pattern, 0 /* Normal */, referenced);
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=token.js.map