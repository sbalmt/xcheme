"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Directive = require("../../core/nodes/directive");
const Parser = require("../../parser");
const Context = require("../context");
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
    const node = parent.getChild(direction);
    const replacement = new Directive.Node(node, state.record);
    parent.setChild(direction, replacement);
    project.symbols.add(state.record);
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
    const identifier = node.fragment.data;
    if (project.symbols.has(identifier)) {
        project.addError(node.fragment, 4096 /* DUPLICATE_IDENTIFIER */);
    }
    else {
        const expression = node.right;
        state.type = 2 /* Token */;
        state.record = node.table.get(identifier);
        Context.setMetadata(project, identifier, state.record, state);
        if (expression.value === 204 /* String */) {
            String.consume(project, 1 /* Right */, node, state);
            const word = expression.fragment.data;
            if (!Loose.collision(project, word, expression)) {
                emit(project, direction, parent, state);
                project.symbols.link(word, identifier);
            }
        }
        else if (expression.value === 206 /* Range */) {
            Range.consume(project, 1 /* Right */, node, state);
            const range = `${expression.left.fragment.data}-${expression.right.fragment.data}`;
            if (!Loose.collision(project, range, expression)) {
                emit(project, direction, parent, state);
                project.symbols.link(range, identifier);
            }
        }
        else {
            Expression.consume(project, 1 /* Right */, node, state);
            emit(project, direction, parent, state);
        }
    }
};
exports.consume = consume;
//# sourceMappingURL=token.js.map