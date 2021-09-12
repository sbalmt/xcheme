"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Expression = require("./expression");
/**
 * Emit a new node entry into the given project.
 * @param project Input project.
 * @param type Node type.
 * @param name Node name.
 * @param identity Node identity.
 * @param pattern Node pattern.
 * @param ref Determines whether or not the node is referenced by another one.
 */
const emit = (project, type, name, identity, pattern, ref) => {
    if (ref) {
        const reference = project.coder.emitReferencePattern(project.nodePointerEntries, name);
        project.nodePointerEntries.add(0 /* Normal */, name, identity, pattern);
        project.nodeEntries.add(type, name, identity, reference);
    }
    else {
        project.nodeEntries.add(type, name, identity, pattern);
    }
};
/**
 * Consume the specified input node resolving its 'NODE' pattern.
 * @param project Input project.
 * @param directive Directive node.
 * @param pointers Initial context pointers.
 * @param alias Determines whether or not the node is an alias.
 */
const consume = (project, directive, pointers, alias) => {
    const identity = directive.identity;
    const state = { type: 2 /* Node */, identity, pointers };
    const expression = Expression.consume(project, directive.right, state);
    if (expression !== void 0) {
        const identifier = directive.fragment.data;
        const referenced = pointers.has(identifier);
        if (alias) {
            emit(project, 1 /* Alias */, identifier, identity, expression, referenced);
        }
        else {
            const pattern = project.coder.emitNodePattern(identity, 1 /* Right */, expression);
            emit(project, 0 /* Normal */, identifier, identity, pattern, referenced);
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=node.js.map