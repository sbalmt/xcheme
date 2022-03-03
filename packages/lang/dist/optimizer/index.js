"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeNodes = void 0;
const Core = require("@xcheme/core");
const Project = require("../core/project");
const Counter = require("../core/counter");
const Parser = require("../parser");
const Identity = require("./identity");
const Context = require("./context");
const Import = require("./patterns/import");
const Export = require("./patterns/export");
const Node = require("./patterns/node");
const Token = require("./patterns/token");
const Skip = require("./patterns/skip");
const exception_1 = require("../core/exception");
/**
 * Global skip counter.
 */
const skipCounter = new Counter.Context();
/**
 * Resolve the token or node directive for the given node and update the specified project.
 * @param project Project context.
 * @param node Directive node.
 * @param state Consumption state.
 * @throws Throws an exception when the given node isn't valid.
 */
const resolveTokenOrNode = (project, node, state) => {
    const identity = Identity.resolve(node.right);
    state.identity = identity ?? Project.Context.identity.increment(project.coder, project.options.identity);
    switch (node.value) {
        case 238 /* Token */:
        case 240 /* AliasToken */:
            Token.consume(project, 1 /* Right */, node, state);
            break;
        case 239 /* Node */:
        case 241 /* AliasNode */:
            Node.consume(project, 1 /* Right */, node, state);
            break;
        default:
            throw new exception_1.Exception(`Invalid node type (${node.value}).`);
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
            case 242 /* Import */:
                Import.consume(project, current);
                break;
            case 243 /* Export */:
                if (!Export.consume(project, current, state)) {
                    resolveTokenOrNode(project, current.right, state);
                    state.record.data.exported = true;
                }
                break;
            case 237 /* Skip */:
                state.identity = skipCounter.increment(project);
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