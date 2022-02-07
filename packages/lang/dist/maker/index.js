"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeNodes = void 0;
const Directive = require("../core/nodes/directive");
const Parser = require("../parser");
const Node = require("./patterns/node");
const Token = require("./patterns/token");
const Skip = require("./patterns/skip");
/**
 * Resolve the token or node directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 */
const resolveTokenOrNode = (project, node) => {
    const directive = node.right;
    if (!(directive instanceof Directive.Node)) {
        throw `An AST node directive is expected.`;
    }
    const state = { directive };
    switch (node.value) {
        case 237 /* Token */:
            Token.consume(project, state);
            break;
        case 238 /* Node */:
            Node.consume(project, state);
            break;
        case 239 /* AliasToken */:
            Token.consume(project, state);
            break;
        case 240 /* AliasNode */:
            Node.consume(project, state);
            break;
        default:
            throw `Unsupported AST node directive.`;
    }
};
/**
 * Resolve the skip directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Input node.
 */
const resolveSkip = (project, node) => {
    if (!(node instanceof Directive.Node)) {
        project.addError(node, 4099 /* UNEXPECTED_NODE */);
    }
    else {
        const state = { directive: node };
        Skip.consume(project, state);
    }
};
/**
 * Consume the specified node (organized as an AST) and produce output entries for updating the given project.
 * @param node Input node.
 * @param project Project context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeNodes = (node, project) => {
    while ((node = node.next)) {
        if (node.value === 241 /* Import */) {
            // Just ignore for now...
        }
        else if (node.value === 242 /* Export */) {
            const current = node.right;
            if (current.value !== 200 /* Identifier */) {
                resolveTokenOrNode(project, current);
            }
        }
        else if (node.value === 236 /* Skip */) {
            resolveSkip(project, node);
        }
        else {
            resolveTokenOrNode(project, node);
        }
    }
    return project.errors.length === 0;
};
exports.consumeNodes = consumeNodes;
//# sourceMappingURL=index.js.map