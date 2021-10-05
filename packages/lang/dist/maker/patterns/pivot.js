"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Nodes = require("../resolvers/nodes");
/**
 * Consume the given node resolving the 'PIVOT' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state) => {
    const patterns = Nodes.resolve(project, node.right, state);
    if (patterns !== void 0) {
        const [test, ...remaining] = patterns;
        const { directive } = state;
        const identity = directive.dynamic ? Core.BaseSource.Output : directive.identity;
        return project.coder.emitPivotPattern(identity, test, ...remaining);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=pivot.js.map