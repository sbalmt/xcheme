"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeNodes = void 0;
const Core = require("@xcheme/core");
const Parser = require("../parser");
const Context = require("./context");
const Import = require("./patterns/import");
const Export = require("./patterns/export");
const Node = require("./patterns/node");
const Token = require("./patterns/token");
const Skip = require("./patterns/skip");
/**
 * Resolve the identity from the given node.
 * @param node Input node.
 * @returns Returns the identity.
 */
const resolveIdentity = (node) => {
    if (node.left) {
        const identity = node.left.fragment.data;
        if (identity === 'auto') {
            return Core.BaseSource.Output;
        }
        return parseInt(identity);
    }
    return NaN;
};
/**
 * Resolve the token or node directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 */
const resolveTokenOrNode = (project, node, state) => {
    state.entry.identity = resolveIdentity(node.right) || Context.getCount(project);
    switch (node.value) {
        case 236 /* Token */:
            Token.consume(project, 1 /* Right */, node, state);
            break;
        case 237 /* Node */:
            Node.consume(project, 1 /* Right */, node, state);
            break;
        case 238 /* AliasToken */:
            state.entry.alias = true;
            Token.consume(project, 1 /* Right */, node, state);
            break;
        case 239 /* AliasNode */:
            state.entry.alias = true;
            Node.consume(project, 1 /* Right */, node, state);
            break;
        default:
            throw `Unexpected AST node.`;
    }
};
/**
 * Consume the specified node (organized as an AST) and optimize that AST for the maker.
 * @param node Input node.
 * @param project Project context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeNodes = (node, project) => {
    let current;
    while ((current = node.next)) {
        const state = Context.getNewState(node, -1);
        switch (current.value) {
            case 240 /* Import */:
                Import.resolve(project, current);
                break;
            case 241 /* Export */:
                if (!Export.resolve(project, current)) {
                    state.entry.exported = true;
                    resolveTokenOrNode(project, current.right, state);
                }
                break;
            case 235 /* Skip */:
                state.entry.identity = Context.getCount(project);
                Skip.consume(project, 2 /* Next */, node, state);
                break;
            default:
                resolveTokenOrNode(project, current, state);
        }
        node = state.anchor.next;
    }
    return project.errors.length === 0;
};
exports.consumeNodes = consumeNodes;
//# sourceMappingURL=index.js.map