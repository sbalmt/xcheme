"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Context = require("../context");
const Tree = require("../tree");
const Expression = require("./expression");
const Token = require("./token");
/**
 * Consume the specified input node optimizing its string pattern.
 * @param project Input project.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Context state.
 */
const consume = (project, direction, parent, state) => {
    if (state.type === 3 /* Node */) {
        const node = parent.getChild(direction);
        const word = node.fragment.data;
        let entry = state.references[word];
        if (entry !== void 0) {
            if (entry.type === 1 /* User */) {
                project.errors.push(new Core.Error(node.fragment, 4115 /* TOKEN_COLLISION */));
            }
        }
        else {
            const token = Tree.getToken(`@REF${++state.counter}`, node.table, node.fragment.location, node);
            const temp = Context.getNewState(state.anchor, state.references, state.counter);
            temp.entry.type = 2 /* Loose */;
            Token.consume(project, 1 /* Right */, token, temp);
            token.setChild(2 /* Next */, state.anchor.next);
            state.counter = temp.counter;
            state.anchor.setChild(2 /* Next */, token);
            state.anchor = token;
            entry = state.references[word];
        }
        const reference = Tree.getReference(entry.identifier, node.table, node.fragment.location);
        parent.setChild(direction, reference);
        Expression.consume(project, direction, parent, state);
    }
};
exports.consume = consume;
//# sourceMappingURL=string.js.map