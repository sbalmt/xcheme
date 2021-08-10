"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeNodes = void 0;
const Core = require("@xcheme/core");
const Parser = require("../parser");
const Skip = require("./patterns/skip");
const Token = require("./patterns/token");
const Node = require("./patterns/node");
/**
 * Get the identity from the specified node.
 * @param node Identifiable node.
 * @param identity Default identity.
 * @returns Returns the node identity.
 */
const getIdentity = (node, identity) => {
    if (node.left) {
        return parseInt(node.left.fragment.data);
    }
    return identity;
};
/**
 * Consume the specified node (organized as an AST) and produce output entries for updating the given project.
 * @param node Input node.
 * @param project Output project.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeNodes = (node, project) => {
    const pointer = new Set();
    for (let counter = project.options.initialIdentity ?? 0; (node = node.next); counter++) {
        const current = node.right;
        let state;
        if (node.value === 202 /* Skip */) {
            state = Skip.consume(project, current, pointer, counter);
        }
        else {
            const identity = getIdentity(current, counter);
            switch (node.value) {
                case 204 /* Token */:
                    state = Token.consume(project, current, identity, pointer, counter, false);
                    break;
                case 206 /* AliasToken */:
                    state = Token.consume(project, current, identity, pointer, counter, true);
                    break;
                case 203 /* Node */:
                    state = Node.consume(project, current, identity, pointer, counter, false);
                    break;
                case 205 /* AliasNode */:
                    state = Node.consume(project, current, identity, pointer, counter, true);
                    break;
                default:
                    project.errors.push(new Core.Error(node.fragment, 4099 /* UNEXPECTED_NODE */));
            }
        }
        if (state) {
            counter = state.counter;
        }
    }
    return project.errors.length === 0;
};
exports.consumeNodes = consumeNodes;
//# sourceMappingURL=index.js.map