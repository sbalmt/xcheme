"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Parser = require("../../parser");
const Directive = require("../nodes/directive");
const Expression = require("./expression");
const Range = require("./range");
const String = require("./string");
/**
 * Assign a new reference to the current consumption state.
 * @param project Input project.
 * @param node Input node.
 * @param state Consumption state.
 * @param link Entry link name.
 */
const assign = (project, node, state, link) => {
    const current = project.tokenEntries.get(link);
    if (current !== void 0) {
        if (current.origin !== 2 /* Loose */) {
            project.errors.push(new Core.Error(node.fragment, 4115 /* TOKEN_COLLISION */));
        }
    }
    else {
        const entry = state.entry;
        project.tokenEntries.add(entry.type, entry.origin, entry.identifier, entry.identity, entry.dynamic);
        project.tokenEntries.link(link, entry.identifier);
    }
};
/**
 * Consume the specified input node resolving its 'TOKEN' pattern.
 * @param project Input project.
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
    if (entry.origin === 0 /* Undefined */) {
        entry.origin = 1 /* User */;
    }
    if (expression.value === 203 /* String */) {
        String.consume(project, 1 /* Right */, node, state);
        const word = node.right.fragment.data;
        assign(project, node, state, word);
    }
    else if (expression.value === 205 /* Range */) {
        Range.consume(project, 1 /* Right */, node, state);
        const range = `${expression.left.fragment.data}-${expression.right.fragment.data}`;
        assign(project, node, state, range);
    }
    else {
        Expression.consume(project, 1 /* Right */, node, state);
        project.tokenEntries.add(entry.type, entry.origin, entry.identifier, entry.identity, entry.dynamic);
    }
    parent.setChild(direction, new Directive.Node(node, entry));
    state.type = type;
};
exports.consume = consume;
//# sourceMappingURL=token.js.map