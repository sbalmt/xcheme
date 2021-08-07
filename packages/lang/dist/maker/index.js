"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeNodes = void 0;
const Core = require("@xcheme/core");
const Parser = require("../parser");
const Skip = require("./patterns/skip");
const Token = require("./patterns/token");
const Node = require("./patterns/node");
/**
 * Consume the specified node (organized as an AST) and produce output entries for updating the given project.
 * @param node Input node.
 * @param project Output project.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
const consumeNodes = (node, project) => {
    const pointer = new Set();
    const counter = {
        token: project.options.counters?.token ?? 1000,
        node: project.options.counters?.node ?? 2000
    };
    let skipCounter = 0;
    while ((node = node.next)) {
        switch (node.value) {
            case 201 /* Skip */:
                Skip.consume(project, node.right, skipCounter++, pointer, counter);
                break;
            case 203 /* Token */:
                Token.consume(project, node.right, pointer, counter, false);
                counter.token++;
                break;
            case 205 /* AliasToken */:
                Token.consume(project, node.right, pointer, counter, true);
                counter.token++;
                break;
            case 202 /* Node */:
                Node.consume(project, node.right, pointer, counter, false);
                counter.node++;
                break;
            case 204 /* AliasNode */:
                Node.consume(project, node.right, pointer, counter, true);
                counter.node++;
                break;
            default:
                project.errors.push(new Core.Error(node.fragment, 4099 /* UNEXPECTED_NODE */));
        }
    }
    return project.errors.length === 0;
};
exports.consumeNodes = consumeNodes;
//# sourceMappingURL=index.js.map