"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const String = require("../../core/string");
/**
 * Consume the given input node resolving its string patterns.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    if (state.type === 2 /* Node */) {
        project.errors.push(new Core.Error(node.fragment, 4100 /* UNSUPPORTED_NODE */));
        return void 0;
    }
    const units = String.extract(node.fragment.data).split('');
    return project.coder.emitExpectUnitsPattern(units);
};
exports.consume = consume;
//# sourceMappingURL=string.js.map