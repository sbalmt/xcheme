"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeNodes = void 0;
const Directive = require("../core/nodes/directive");
const Parser = require("../parser");
const Skip = require("./patterns/skip");
const Token = require("./patterns/token");
const Node = require("./patterns/node");
/**
 * Consume the specified node (organized as an AST) and produce output entries for updating the given project.
 * @param node Input node.
 * @param project Project context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeNodes = (node, project) => {
    while ((node = node.next) !== void 0) {
        if (node.value === 235 /* Skip */) {
            if (!(node instanceof Directive.Node)) {
                project.addError(node, 4099 /* UNEXPECTED_NODE */);
            }
            else {
                const state = { directive: node };
                Skip.consume(project, state);
            }
        }
        else {
            const directive = node.right;
            if (!(directive instanceof Directive.Node)) {
                project.addError(node, 4099 /* UNEXPECTED_NODE */);
            }
            else {
                const state = { directive };
                switch (node.value) {
                    case 236 /* Token */:
                        Token.consume(project, state);
                        break;
                    case 237 /* Node */:
                        Node.consume(project, state);
                        break;
                    case 238 /* AliasToken */:
                        Token.consume(project, state);
                        break;
                    case 239 /* AliasNode */:
                        Node.consume(project, state);
                        break;
                    default:
                        project.addError(directive, 4099 /* UNEXPECTED_NODE */);
                }
            }
        }
    }
    return project.errors.length === 0;
};
exports.consumeNodes = consumeNodes;
//# sourceMappingURL=index.js.map