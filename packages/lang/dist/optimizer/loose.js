"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = exports.collision = void 0;
const Core = require("@xcheme/core");
const Token = require("./patterns/token");
const Context = require("./context");
const Nodes = require("./nodes");
/**
 * Emit a new loose token and returns the corresponding pattern entry.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param name Entry name.
 * @returns Returns the generated pattern entry.
 */
const emit = (project, node, state, name) => {
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
/**
 * Determines whether or not there are an entry collision for the given name.
 * @param project Project context.
 * @param node Input node.
 * @param name Entry name.
 * @returns Returns true when the specified name already exists, false otherwise.
 */
const collision = (project, node, name) => {
    if (project.tokenEntries.has(name)) {
        project.addError(node, 4115 /* TOKEN_COLLISION */);
        return true;
    }
    return false;
};
exports.collision = collision;
/**
 * Resolve the loose pattern entry for the given node.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param name Entry name.
 * @returns Returns the loose pattern entry.
 */
const resolve = (project, node, state, name) => {
    const entry = project.tokenEntries.get(name);
    if (entry !== void 0) {
        if (entry.origin === 0 /* User */) {
            project.addError(node, 4115 /* TOKEN_COLLISION */);
        }
        return entry;
    }
    return emit(project, node, state, name);
};
exports.resolve = resolve;
//# sourceMappingURL=loose.js.map