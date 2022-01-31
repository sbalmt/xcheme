"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Directive = require("../../core/nodes/directive");
const Parser = require("../../parser");
const Loose = require("../loose");
const Expression = require("./expression");
const Range = require("./range");
const String = require("./string");
/**
 * Emit a new token entry and replace the current token node by an optimized one.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const emit = (project, direction, parent, state) => {
    const { origin, identifier, identity } = state.entry;
    const node = parent.getChild(direction);
    const entry = project.local.create(2 /* Token */, origin, identifier, identity, state.entry);
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
    entry.type = 2 /* Token */;
    entry.identifier = node.fragment.data;
    if (expression.value === 204 /* String */) {
        String.consume(project, 1 /* Right */, node, state);
        const word = expression.fragment.data;
        if (!Loose.collision(project, expression, word)) {
            emit(project, direction, parent, state);
            project.local.link(word, entry.identifier);
        }
    }
    else if (expression.value === 206 /* Range */) {
        Range.consume(project, 1 /* Right */, node, state);
        const range = `${expression.left.fragment.data}-${expression.right.fragment.data}`;
        if (!Loose.collision(project, expression, range)) {
            emit(project, direction, parent, state);
            project.local.link(range, entry.identifier);
        }
    }
    else {
        Expression.consume(project, 1 /* Right */, node, state);
        emit(project, direction, parent, state);
    }
};
exports.consume = consume;
//# sourceMappingURL=token.js.map