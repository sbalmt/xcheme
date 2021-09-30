"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitToken = void 0;
const Core = require("@xcheme/core");
const Token = require("./patterns/token");
const Context = require("./context");
const Nodes = require("./nodes");
/**
 * Emit a new loose token and returns the corresponding pattern entry.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param name Loose token name.
 * @returns Returns the generated pattern entry.
 */
const emitToken = (project, node, state, name) => {
    const temp = Context.getNewState(state.anchor, state.counter);
    const token = Nodes.getToken(`@REF${temp.entry.identity}`, node.table, node.fragment.location, node);
    temp.entry.origin = 1 /* Loose */;
    temp.counter++;
    Token.consume(project, 1 /* Right */, token, temp);
    token.setChild(2 /* Next */, state.anchor.next);
    state.counter = temp.counter;
    state.anchor.setChild(2 /* Next */, token);
    state.anchor = token;
    return project.tokenEntries.get(name);
};
exports.emitToken = emitToken;
//# sourceMappingURL=loose.js.map