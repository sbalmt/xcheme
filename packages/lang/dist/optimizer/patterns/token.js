"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Directive = require("../../core/nodes/directive");
const Parser = require("../../parser");
const Expression = require("./expression");
const Range = require("./range");
const String = require("./string");
/**
 * Determines whether or not there are a collision for the given identifier.
 * @param project Project context.
 * @param node Input node.
 * @param identifier Entry identifier.
 * @returns Returns true when the specified identifier already exists, false otherwise.
 */
const collision = (project, node, identifier) => {
    const entry = project.tokenEntries.get(identifier);
    if (entry?.origin === 0 /* User */) {
        project.addError(node, 4115 /* TOKEN_COLLISION */);
        return true;
    }
    return false;
};
/**
 * Emit a new token entry and replace the current token node by an optimized one.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const emit = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const entry = project.tokenEntries.add(state.entry.origin, state.entry.identifier, state.entry.identity, state.entry);
    const replacement = new Directive.Node(node, 1 /* Token */, entry);
    parent.setChild(direction, replacement);
};
/**
 * Consume a child node from the AST on the given parent and optimize the 'TOKEN' directive.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const consume = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const expression = node.right;
    const entry = state.entry;
    const type = state.type;
    state.type = 2 /* Token */;
    entry.identifier = node.fragment.data;
    if (expression.value === 203 /* String */) {
        String.consume(project, 1 /* Right */, node, state);
        const word = node.right.fragment.data;
        if (!collision(project, node, word)) {
            emit(project, direction, parent, state);
            project.tokenEntries.link(word, state.entry.identifier);
        }
    }
    else if (expression.value === 205 /* Range */) {
        Range.consume(project, 1 /* Right */, node, state);
        const range = `${expression.left.fragment.data}-${expression.right.fragment.data}`;
        if (!collision(project, node, range)) {
            emit(project, direction, parent, state);
            project.tokenEntries.link(range, state.entry.identifier);
        }
    }
    else {
        Expression.consume(project, 1 /* Right */, node, state);
        emit(project, direction, parent, state);
    }
    state.type = type;
};
exports.consume = consume;
//# sourceMappingURL=token.js.map