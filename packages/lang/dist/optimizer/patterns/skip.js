"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Directive = require("../../core/nodes/directive");
const Parser = require("../../parser");
const Context = require("../context");
const Expression = require("./expression");
/**
 * Emit a new skip entry and replace the current skip node by an optimized one.
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
 * Consume a child node from the AST on the given parent and optimize the 'SKIP' directive.
 * @param project Project context.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const consume = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const identifier = `@SKIP${state.identity}`;
    const line = new Core.Range(0, 0);
    const column = new Core.Range(0, identifier.length);
    const location = new Core.Location(project.name, line, column);
    const fragment = new Core.Fragment(identifier, 0, identifier.length, location);
    const record = new Core.Record(fragment, 300 /* Skip */, node);
    state.type = 1 /* Skip */;
    state.record = node.table.add(record);
    Context.setMetadata(project, identifier, state.record, state);
    Expression.consume(project, 1 /* Right */, node, state);
    emit(project, direction, parent, state);
};
exports.consume = consume;
//# sourceMappingURL=skip.js.map