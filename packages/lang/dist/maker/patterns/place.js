"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = void 0;
const And = require("./and");
/**
 * Consume the specified input node resolving its 'PLACE' pattern.
 * @param project Input project.
 * @param node Input node.
 * @param state Context state.
 * @param direction Placed node direction.
 * @returns Returns the consumption result or undefined when the pattern is invalid.
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