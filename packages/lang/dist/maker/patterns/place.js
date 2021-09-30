"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const And = require("./and");
/**
 * Consume the given node resolving the 'PLACE' pattern.
 * @param project Project context.
 * @param node Input node.
 * @param state Consumption state.
 * @param direction Placed node direction.
 * @returns Returns the pattern or undefined when the node is invalid.
 */
const consume = (project, node, state, direction) => {
    const patterns = And.resolve(project, node.right, state);
    if (patterns !== void 0) {
        return project.coder.emitPlacePattern(direction, ...patterns);
    }
    return void 0;
};
exports.consume = consume;
//# sourceMappingURL=place.js.map