"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Expression = require("./expression");
/**
 * Emit a new node entry into the given project.
 * @param project Input project.
 * @param identity Node identity.
 * @param name Node name.
 * @param pattern Node pattern.
 * @param type Node type.
 * @param ref Determines whether or not the node is referenced by another one.
 */
const emit = (project, identity, name, pattern, type, ref) => {
    if (ref) {
        const reference = project.coder.getReference(project.nodePointerEntries, name);
        project.nodePointerEntries.add(identity, name, pattern, 0 /* Normal */);
        project.nodeEntries.add(identity, name, reference, type);
    }
    else {
        project.nodeEntries.add(identity, name, pattern, type);
    }
};
/**
 * Consume the specified input node resolving its 'NODE' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param identity Pattern identity.
 * @param pointers Initial context pointers.
 * @param counter Initial context counter.
 * @param alias Determines whether or not the node is an alias.
 * @returns Returns the consumption state.
 */
const consume = (project, node, identity, pointers, counter, alias) => {
    const state = { identity, pointers, counter, type: 2 /* Node */ };
    const entry = Expression.consume(project, node.right, state);
    if (entry) {
        const name = node.fragment.data;
        const referenced = pointers.has(name);
        if (alias) {
            emit(project, identity, name, entry, 1 /* Alias */, referenced);
        }
        else {
            const pattern = project.coder.getNode(identity, 1 /* Right */, entry);
            emit(project, identity, name, pattern, 0 /* Normal */, referenced);
        }
    }
    return state;
};
exports.consume = consume;
//# sourceMappingURL=node.js.map