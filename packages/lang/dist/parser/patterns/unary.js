"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Core = require("@xcheme/core");
/**
 * Prefixed unary expression pattern.
 */
class Unary extends Core.Pattern {
    /**
     * Unary pattern.
     */
    #pattern;
    /**
     * Default constructor.
     * @param operator Unary operator.
     * @param expression Expression pattern.
     */
    constructor(operator, expression) {
        super();
        this.#pattern = new Core.ExpectFlowPattern(new Core.OptFlowPattern(new Core.RepeatFlowPattern(new Core.AppendNodePattern(Core.BaseSource.Output, 1 /* Right */, 1 /* Right */, operator))), expression);
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
exports.default = Unary;
//# sourceMappingURL=unary.js.map