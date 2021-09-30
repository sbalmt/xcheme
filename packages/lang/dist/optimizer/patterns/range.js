"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Context = require("../context");
const Nodes = require("../nodes");
const Expression = require("./expression");
const Token = require("./token");
/**
 * Consume a child node from the AST on the given parent and optimize the range pattern.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
const consume = (project, direction, parent, state) => {
    if (state.type === 3 /* Node */) {
        const node = parent.getChild(direction);
        const range = `${node.left.fragment.data}-${node.right.fragment.data}`;
        let entry = project.tokenEntries.get(range);
        if (entry !== void 0) {
            if (entry.origin === 0 /* User */) {
                project.addError(node, 4115 /* TOKEN_COLLISION */);
            }
        }
        else {
            const temp = Context.getNewState(state.anchor, state.counter);
            const identifier = `@REF${temp.entry.identity}`;
            const token = Nodes.getToken(identifier, node.table, node.fragment.location, node);
            temp.entry.origin = 1 /* Loose */;
            temp.counter++;
            Token.consume(project, 1 /* Right */, token, temp);
            token.setChild(2 /* Next */, state.anchor.next);
            state.counter = temp.counter;
            state.anchor.setChild(2 /* Next */, token);
            state.anchor = token;
            entry = project.tokenEntries.get(range);
        }
        const reference = Nodes.getReference(entry.identifier, node.table, node.fragment.location);
        parent.setChild(direction, reference);
        Expression.consume(project, direction, parent, state);
    }
};
exports.consume = consume;
//# sourceMappingURL=range.js.map