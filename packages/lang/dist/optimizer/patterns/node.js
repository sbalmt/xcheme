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
 * @param alias Determines whether or not the node is an alias.
 */
const consume = (project, direction, parent, state, alias) => {
    const node = parent.getChild(direction);
    const entry = { type: 0 /* User */, identity: state.identity, identifier: node.fragment.data };
    const type = state.type;
    state.type = 3 /* Node */;
    Expression.consume(project, 1 /* Right */, node, state);
    parent.setChild(direction, new Directive.Node(node, entry.identity, alias));
    state.references[entry.identifier] = entry;
    state.type = type;
};
exports.consume = consume;
//# sourceMappingURL=node.js.map