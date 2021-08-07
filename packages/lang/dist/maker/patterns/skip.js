"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Expression = require("./expression");
/**
 * Consume the specified input node resolving its 'SKIP' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param id Skip Id.
 * @param pointers Initial context pointers.
 * @param counters Initial context counters.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
 */
const consume = (project, node, id, pointers, counters) => {
    const entry = Expression.consume(project, node, { id, pointers, counters, type: 0 /* Skip */ });
    if (entry) {
        project.skipEntries.add(id, `SKIP${id}`, entry, 0 /* Normal */);
    }
};
exports.consume = consume;
//# sourceMappingURL=skip.js.map