"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Member = require("../../core/nodes/member");
const Mergeable = require("../../core/nodes/mergeable");
const Identity = require("../../core/nodes/identity");
const Parser = require("../../parser");
const Expression = require("./expression");
/**
 * Get the candidate node based on the given input node.
 * @param node Input node.
 * @param parent Node parent.
 * @returns Returns the candidate node or undefined when there's no candidates.
 */
const getCandidate = (node, parent) => {
    if (node.value !== 209 /* Then */ && node.value !== 211 /* Or */) {
        if (node.value === 203 /* String */ || node instanceof Identity.Node || node instanceof Mergeable.Node) {
            if (parent !== void 0) {
                const right = parent.right;
                parent.setChild(0 /* Left */, void 0);
                parent.setChild(1 /* Right */, void 0);
                parent.swap(right);
            }
            return node;
        }
        if (node.left !== void 0) {
            return getCandidate(node.left, node);
        }
    }
    return void 0;
};
/**
 * Consume a child node from the AST on the given parent and optimize the map pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
const consume = (project, direction, parent, state) => {
    let member = parent.getChild(direction).right;
    state.entry.dynamic = true;
    while (member !== void 0) {
        const expression = member.right;
        if (expression.value === 200 /* Identifier */) {
            if (state.type === 1 /* Skip */) {
                project.addError(expression, 4101 /* UNSUPPORTED_IDENTITY */);
                break;
            }
            const entry = state.entry;
            state.entry = {
                origin: 0 /* User */,
                identity: expression.left !== void 0 ? parseInt(expression.left.fragment.data) : NaN || state.entry.identity,
                identifier: `${state.entry.identifier}@${expression.fragment.data}`,
                alias: false,
                dynamic: false
            };
            Expression.consume(project, 1 /* Right */, expression, state);
            const candidate = getCandidate(expression.right);
            if (candidate !== void 0) {
                const replacement = new Member.Node(expression.right, state.entry.identity, state.entry.dynamic, candidate);
                member.setChild(1 /* Right */, replacement);
            }
            else {
                project.addError(member, 4114 /* INVALID_MAP_ENTRY */);
            }
            if (state.type === 2 /* Token */) {
                project.tokenEntries.add(state.entry.origin, state.entry.identifier, state.entry.identity, state.entry);
            }
            else {
                project.nodeEntries.add(state.entry.origin, state.entry.identifier, state.entry.identity, state.entry);
            }
            state.entry = entry;
        }
        else {
            Expression.consume(project, 1 /* Right */, member, state);
            const candidate = getCandidate(member.right);
            if (candidate !== void 0) {
                member.setChild(1 /* Right */, new Member.Node(member.right, state.entry.identity, false, candidate));
            }
            else {
                project.addError(member, 4114 /* INVALID_MAP_ENTRY */);
            }
        }
        member = member.next;
    }
};
exports.consume = consume;
//# sourceMappingURL=map.js.map