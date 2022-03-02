"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = exports.collision = void 0;
const Core = require("@xcheme/core");
const Project = require("../core/project");
const Token = require("./patterns/token");
const Context = require("./context");
const Nodes = require("./nodes");
/**
 * Emit a new loose token and returns the corresponding record.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the generated record.
 */
const emit = (project, node, state) => {
    const identity = Project.Context.identity.increment(project.coder, project.options.identity);
    const token = Nodes.getToken(`@REF${identity}`, node.table, node.fragment.location, node);
    const temp = Context.getNewState(state.anchor, identity);
    temp.origin = 1 /* Loose */;
    Token.consume(project, 1 /* Right */, token, temp);
    token.setChild(2 /* Next */, state.anchor.next);
    state.anchor.setChild(2 /* Next */, token);
    state.anchor = token;
    return temp.record;
};
/**
 * Determines whether or not there are a collision for the given name.
 * @param project Project context.
 * @param identifier Record identifier.
 * @param node Input node.
 * @returns Returns true when the specified name already exists, false otherwise.
 */
const collision = (project, identifier, node) => {
    if (project.symbols.has(identifier)) {
        project.addError(node.fragment, 4116 /* TOKEN_COLLISION */);
        return true;
    }
    return false;
};
exports.collision = collision;
/**
 * Resolve the loose pattern record for the given node.
 * @param project Project context.
 * @param identifier Record identifier.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the loose pattern record.
 */
const resolve = (project, identifier, node, state) => {
    const record = project.symbols.get(identifier);
    if (record) {
        if (record.data.origin === 0 /* User */) {
            project.addError(node.fragment, 4116 /* TOKEN_COLLISION */);
        }
        return record;
    }
    return emit(project, node, state);
};
exports.resolve = resolve;
//# sourceMappingURL=loose.js.map