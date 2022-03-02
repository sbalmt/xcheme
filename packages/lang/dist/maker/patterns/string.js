"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const String = require("../../core/string");
/**
 * Consume the given node resolving the string patterns.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const directive = state.directive;
    if (directive.type !== 3 /* Node */) {
        const units = String.extract(node.fragment.data).split('');
        return project.coder.emitExpectUnitsPattern(units);
    }
    project.addError(node.fragment, 4100 /* UNSUPPORTED_NODE */);
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=string.js.map