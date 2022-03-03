"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Member = require("../../core/nodes/member");
const Sequential = require("../../core/nodes/sequential");
const Identified = require("../../core/nodes/identified");
const Parser = require("../../parser");
const Identity = require("../identity");
const Context = require("../context");
const Loose = require("../loose");
const Expression = require("./expression");
/**
 * Get the candidate node based on the given input node.
 * @param node Input node.
 * @param parent Node parent.
 * @returns Returns the candidate node or undefined when there's no candidates.
 */
const getCandidate = (node, parent) => {
    if (node.value !== 209 /* Then */ && node.value !== 211 /* Or */) {
        if (node.value === 204 /* String */ || node instanceof Identified.Node || node instanceof Sequential.Node) {
            if (parent) {
                const right = parent.right;
                parent.setChild(0 /* Left */, void 0);
                parent.setChild(1 /* Right */, void 0);
                parent.swap(right);
            }
            return node;
        }
        if (node.left) {
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
    state.record.data.dynamic = true;
    while (member) {
        const expression = member.right;
        if (expression.value === 200 /* Identifier */) {
            if (state.type === 1 /* Skip */) {
                project.addError(expression.fragment, 4101 /* UNSUPPORTED_IDENTITY */);
                break;
            }
            const record = state.record;
            const identifier = `${record.data.identifier}@${expression.fragment.data}`;
            if (project.symbols.has(identifier)) {
                project.addError(expression.fragment, 4096 /* DUPLICATE_IDENTIFIER */);
            }
            else {
                const identity = state.identity;
                state.identity = Identity.resolve(expression) ?? state.identity;
                state.record = member.table.get(expression.fragment.data);
                Context.setMetadata(project, identifier, state.record, state);
                Expression.consume(project, 1 /* Right */, expression, state);
                const candidate = getCandidate(expression.right);
                if (!candidate) {
                    project.addError(member.fragment, 4114 /* INVALID_MAP_ENTRY */);
                }
                else {
                    if (candidate.value === 204 /* String */) {
                        Loose.collision(project, candidate.fragment.data, candidate);
                    }
                    const replacement = new Member.Node(expression.right, state.record, candidate);
                    member.setChild(1 /* Right */, replacement);
                    project.symbols.add(state.record);
                }
                state.identity = identity;
                state.record = record;
            }
        }
        else {
            Expression.consume(project, 1 /* Right */, member, state);
            const candidate = getCandidate(member.right);
            if (!candidate) {
                project.addError(member.fragment, 4114 /* INVALID_MAP_ENTRY */);
            }
            else {
                if (candidate.value === 204 /* String */) {
                    Loose.collision(project, candidate.fragment.data, candidate);
                }
                const replacement = new Member.Node(member.right, state.record, candidate);
                member.setChild(1 /* Right */, replacement);
            }
        }
        member = member.next;
    }
};
exports.consume = consume;
//# sourceMappingURL=map.js.map