"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeNodes = void 0;
const Core = require("@xcheme/core");
const Parser = require("../parser");
const Context = require("./context");
const Skip = require("./patterns/skip");
const Token = require("./patterns/token");
const Node = require("./patterns/node");
/**
 * Get the identity from the given node.
 * @param node Input node.
 * @returns Returns the identity or undefined when there's no identity.
 */
const getIdentity = (node) => {
    if (node.left !== void 0) {
        const identity = node.left.fragment.data;
        if (identity === 'auto') {
            return Core.BaseSource.Output;
        }
        return parseInt(identity);
    }
    return void 0;
};
/**
 * Consume the specified node (organized as an AST) and optimize that AST for the maker.
 * @param node Input node.
 * @param project Project context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeNodes = (node, project) => {
    let counter = project.options.initialIdentity ?? 0;
    let current;
    while ((current = node.next) !== void 0) {
        const state = Context.getNewState(node, counter);
        if (current.value === 235 /* Skip */) {
            state.counter++;
            Skip.consume(project, 2 /* Next */, node, state);
        }
        else {
            state.entry.identity = getIdentity(current.right) || state.counter++;
            switch (current.value) {
                case 236 /* Token */:
                    Token.consume(project, 1 /* Right */, current, state);
                    break;
                case 237 /* Node */:
                    Node.consume(project, 1 /* Right */, current, state);
                    break;
                case 238 /* AliasToken */:
                    state.entry.alias = true;
                    Token.consume(project, 1 /* Right */, current, state);
                    break;
                case 239 /* AliasNode */:
                    state.entry.alias = true;
                    Node.consume(project, 1 /* Right */, current, state);
                    break;
            }
        }
        counter = state.counter;
        node = state.anchor.next;
    }
    return project.errors.length === 0;
};
exports.consumeNodes = consumeNodes;
//# sourceMappingURL=index.js.map