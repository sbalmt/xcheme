"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const String = require("../common/string");
/**
 * Consume the specified input node resolving its alphabet range pattern.
 * It can also update the given project and context state when new tokens are created.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, state) => {
    const from = node.left.fragment.data;
    const to = node.right.fragment.data;
    const pattern = project.coder.getRange(String.extract(from), String.extract(to));
    if (state.type === 2 /* Node */) {
        const identity = state.counter++;
        const result = project.coder.getToken(identity, pattern);
        project.tokenEntries.add(identity, `${from}-${to}`, result, 0 /* Normal */);
        return project.coder.getAlphabet([identity]);
    }
    return pattern;
};
exports.consume = consume;
//# sourceMappingURL=range.js.map