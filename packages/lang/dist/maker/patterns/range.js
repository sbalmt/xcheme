"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const String = require("../../core/string");
/**
 * Consume the given node resolving the range pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const directive = state.directive;
    if (directive.type !== 3 /* Node */) {
        const from = String.extract(node.left.fragment.data);
        const to = String.extract(node.right.fragment.data);
        return project.coder.emitRangePattern(from, to);
    }
    project.addError(node.fragment, 4100 /* UNSUPPORTED_NODE */);
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=range.js.map