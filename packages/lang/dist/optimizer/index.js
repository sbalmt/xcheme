"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeNodes = void 0;
const Core = require("@xcheme/core");
const Parser = require("../parser");
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
    const references = {};
    while (node.next !== void 0) {
        const entry = node.next;
        const state = { type: 0 /* Undefined */, entry: node, references, identity: counter };
        if (entry.value === 231 /* Skip */) {
            Skip.consume(project, 2 /* Next */, node, state);
        }
        else {
            const directive = entry.right;
            state.identity = (directive.left ? parseInt(directive.left?.fragment.data) : NaN) || counter;
            switch (entry.value) {
                case 232 /* Token */:
                    Token.consume(project, 1 /* Right */, entry, state, false);
                    break;
                case 233 /* Node */:
                    Node.consume(project, 1 /* Right */, entry, state, false);
                    break;
                case 234 /* AliasToken */:
                    Token.consume(project, 1 /* Right */, entry, state, true);
                    break;
                case 235 /* AliasNode */:
                    Node.consume(project, 1 /* Right */, entry, state, true);
                    break;
            }
        }
        counter = state.identity + 1;
        node = node.next;
    }
    return project.errors.length === 0;
};
exports.consumeNodes = consumeNodes;
//# sourceMappingURL=index.js.map