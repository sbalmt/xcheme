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
 * Consume the specified node (organized as an AST) and generate an optimized AST for the maker.
 * @param node Input node.
 * @param project Input project.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeNodes = (node, project) => {
    let counter = project.options.initialIdentity ?? 0;
    while (node.next !== void 0) {
        const state = Context.getNewState(node, counter);
        const entry = node.next;
        if (entry.value === 234 /* Skip */) {
            state.entry.type = 1 /* Normal */;
            Skip.consume(project, 2 /* Next */, node, state);
        }
        else {
            const directive = entry.right;
            if (directive.left !== void 0) {
                state.entry.identity = parseInt(directive.left.fragment.data) || counter;
            }
            switch (entry.value) {
                case 235 /* Token */:
                    state.entry.type = 1 /* Normal */;
                    Token.consume(project, 1 /* Right */, entry, state);
                    break;
                case 236 /* Node */:
                    state.entry.type = 1 /* Normal */;
                    Node.consume(project, 1 /* Right */, entry, state);
                    break;
                case 237 /* AliasToken */:
                    state.entry.type = 2 /* Alias */;
                    Token.consume(project, 1 /* Right */, entry, state);
                    break;
                case 238 /* AliasNode */:
                    state.entry.type = 2 /* Alias */;
                    Node.consume(project, 1 /* Right */, entry, state);
                    break;
            }
        }
        counter = state.counter + 1;
        node = entry;
    }
    return project.errors.length === 0;
};
exports.consumeNodes = consumeNodes;
//# sourceMappingURL=index.js.map