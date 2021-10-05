"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const Core = require("@xcheme/core");
const Nodes = require("../resolvers/nodes");
/**
 * Consume the given node resolving the 'APPEND' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param direction Append direction.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state, direction) => {
    const patterns = Nodes.resolve(project, node.right, state);
    if (patterns !== void 0) {
        const [test, ...remaining] = patterns;
        const { directive } = state;
        const identity = directive.dynamic ? Core.BaseSource.Output : directive.identity;
        return project.coder.emitAppendPattern(identity, direction, test, ...remaining);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=append.js.map