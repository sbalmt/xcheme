"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeNodes = void 0;
const Core = require("@xcheme/core");
const Parser = require("../parser");
const Directive = require("../optimizer/nodes/directive");
const Skip = require("./patterns/skip");
const Token = require("./patterns/token");
const Node = require("./patterns/node");
/**
 * Consume the specified node (organized as an AST) and produce output entries for updating the given project.
 * @param node Input node.
 * @param project Input project.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeNodes = (node, project) => {
    const pointer = new Set();
    while ((node = node.next) !== void 0) {
        if (node.value === 231 /* Skip */) {
            if (!(node instanceof Directive.Node)) {
                project.errors.push(new Core.Error(node.fragment, 4099 /* UNEXPECTED_NODE */));
            }
            else {
                Skip.consume(project, node, pointer);
            }
        }
        else {
            const directive = node.right;
            if (!(directive instanceof Directive.Node)) {
                project.errors.push(new Core.Error(node.fragment, 4099 /* UNEXPECTED_NODE */));
            }
            else {
                switch (node.value) {
                    case 232 /* Token */:
                        Token.consume(project, directive, pointer, false);
                        break;
                    case 233 /* Node */:
                        Node.consume(project, directive, pointer, false);
                        break;
                    case 234 /* AliasToken */:
                        Token.consume(project, directive, pointer, true);
                        break;
                    case 235 /* AliasNode */:
                        Node.consume(project, directive, pointer, true);
                        break;
                    default:
                        project.errors.push(new Core.Error(directive.fragment, 4099 /* UNEXPECTED_NODE */));
                }
            }
        }
    }
    return project.errors.length === 0;
};
exports.consumeNodes = consumeNodes;
//# sourceMappingURL=index.js.map