"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Directive = require("../nodes/directive");
const Expression = require("./expression");
/**
 * Consume the specified input node resolving its 'NODE' pattern.
 * @param project Input project.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const consume = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const entry = state.entry;
    const type = state.type;
    state.type = 3 /* Node */;
    entry.origin = 1 /* User */;
    entry.identifier = node.fragment.data;
    Expression.consume(project, 1 /* Right */, node, state);
    parent.setChild(direction, new Directive.Node(node, entry));
    project.nodeEntries.add(entry.type, entry.origin, entry.identifier, entry.identity, entry.dynamic);
    state.type = type;
};
exports.consume = consume;
//# sourceMappingURL=node.js.map