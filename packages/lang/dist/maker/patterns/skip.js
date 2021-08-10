"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Expression = require("./expression");
/**
 * Consume the specified input node resolving its 'SKIP' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param pointers Initial context pointers.
 * @param counter Initial context counter.
 * @returns Returns the consumption state.
 */
const consume = (project, node, pointers, counter) => {
    const state = { identity: counter, pointers, counter, type: 0 /* Skip */ };
    const entry = Expression.consume(project, node, state);
    if (entry) {
        project.skipEntries.add(counter, `SKIP${counter}`, entry, 0 /* Normal */);
    }
    return state;
};
exports.consume = consume;
//# sourceMappingURL=skip.js.map