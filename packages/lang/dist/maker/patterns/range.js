"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const String = require("../../core/string");
/**
 * Consume the specified input node resolving its range pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    if (state.type === 2 /* Node */) {
        project.errors.push(new Core.Error(node.fragment, 4100 /* UNOPTIMIZED_NODE */));
        return void 0;
    }
    const from = String.extract(node.left.fragment.data);
    const to = String.extract(node.right.fragment.data);
    return project.coder.emitRangePattern(from, to);
};
exports.consume = consume;
//# sourceMappingURL=range.js.map