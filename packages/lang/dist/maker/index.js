"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeNodes = void 0;
const Directive = require("../core/nodes/directive");
const Parser = require("../parser");
const exception_1 = require("../core/exception");
const Node = require("./patterns/node");
const Token = require("./patterns/token");
const Skip = require("./patterns/skip");
/**
 * Resolve the token or node directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Main node.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveMain = (project, node) => {
    const directive = node.right;
    if (!(directive instanceof Directive.Node)) {
        throw new exception_1.Exception('Main nodes must be instances of directive nodes.');
    }
    const state = { directive };
    switch (node.value) {
        case 238 /* Token */:
            Token.consume(project, state);
            break;
        case 239 /* Node */:
            Node.consume(project, state);
            break;
        case 240 /* AliasToken */:
            Token.consume(project, state);
            break;
        case 241 /* AliasNode */:
            Node.consume(project, state);
            break;
        default:
            throw new exception_1.Exception(`Invalid node type (${node.value}).`);
    }
};
/**
 * Resolve the skip directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Skip node.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveSkip = (project, node) => {
    if (!(node instanceof Directive.Node)) {
        throw new exception_1.Exception('Skip nodes must be instances of directive nodes.');
    }
    const state = { directive: node };
    Skip.consume(project, state);
};
/**
 * Consume the specified node (organized as an AST) and update the given project.
 * @param node Root node.
 * @param project Project context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeNodes = (node, project) => {
    while ((node = node.next)) {
        if (node.value === 242 /* Import */) {
            // Just ignore for now...
        }
        else if (node.value === 243 /* Export */) {
            const current = node.right;
            if (current.value !== 200 /* Identifier */) {
                resolveMain(project, current);
            }
        }
        else if (node.value === 237 /* Skip */) {
            resolveSkip(project, node);
        }
        else {
            resolveMain(project, node);
        }
    }
    return project.errors.length === 0;
};
exports.consumeNodes = consumeNodes;
//# sourceMappingURL=index.js.map