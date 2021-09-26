"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Directive = require("../nodes/directive");
const Expression = require("./expression");
/**
 * Consume the specified input node resolving its 'SKIP' pattern.
 * @param project Input project.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param state Consumption state.
 */
const consume = (project, direction, parent, state) => {
    const node = parent.getChild(direction);
    const entry = state.entry;
    const type = state.type;
    state.type = 1 /* Skip */;
    entry.origin = 1 /* User */;
    entry.identifier = `@SKIP${entry.identity}`;
    Expression.consume(project, 1 /* Right */, node, state);
    project.skipEntries.add(entry.type, entry.origin, entry.identifier, entry.identity, entry.dynamic);
    parent.setChild(direction, new Directive.Node(node, entry));
    state.type = type;
};
exports.consume = consume;
//# sourceMappingURL=skip.js.map