"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Directive = require("../../core/nodes/directive");
const Context = require("../context");
const Expression = require("./expression");
/**
 * Emit a new node entry and replace the current node by an optimized one.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const emit = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const replacement = new Directive.Node(node, state.record);
    parent.setChild(direction, replacement);
    project.symbols.add(state.record);
};
/**
 * Consume a child node from the AST on the given parent and optimize the 'NODE' directive.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const consume = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const identifier = node.fragment.data;
    if (project.symbols.has(identifier)) {
        project.addError(node.fragment, 4096 /* DUPLICATE_IDENTIFIER */);
    }
    else {
        state.record = node.table.get(identifier);
        Context.setMetadata(project, identifier, state.record, state);
        Expression.consume(project, 1 /* Right */, node, state);
        emit(project, direction, parent, state);
    }
};
exports.consume = consume;
//# sourceMappingURL=node.js.map