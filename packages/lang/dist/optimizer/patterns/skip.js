"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Directive = require("../../core/nodes/directive");
const Expression = require("./expression");
/**
 * Emit a new skip entry and replace the current skip node by an optimized one.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const emit = (project, direction, parent, state) => {
    const { origin, identifier, identity } = state.entry;
    const node = parent.getChild(direction);
    const entry = project.local.create(1 /* Skip */, origin, identifier, identity, state.entry);
    const replacement = new Directive.Node(node, 0 /* Skip */, entry);
    parent.setChild(direction, replacement);
};
/**
 * Consume a child node from the AST on the given parent and optimize the 'SKIP' directive.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const consume = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const entry = state.entry;
    entry.type = 1 /* Skip */;
    entry.identifier = `@SKIP${entry.identity}`;
    Expression.consume(project, 1 /* Right */, node, state);
    emit(project, direction, parent, state);
};
exports.consume = consume;
//# sourceMappingURL=skip.js.map