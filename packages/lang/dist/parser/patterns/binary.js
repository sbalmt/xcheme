"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Core = require("@xcheme/core");
/**
 * Binary expression pattern.
 */
class Binary extends Core.Pattern {
    /**
     * Binary pattern.
     */
    #pattern;
    /**
     * Default constructor.
     * @param operator Binary operator pattern.
     * @param expression Expression pattern.
     */
    constructor(operator, expression) {
        super();
        this.#pattern = new Core.ExpectFlowPattern(expression, new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.PivotNodePattern(Core.BaseSource.Output, 1 /* Right */, 0 /* Left */, operator, expression))));
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        return this.#pattern.consume(source);
    }
}
exports.default = Binary;
//# sourceMappingURL=binary.js.map