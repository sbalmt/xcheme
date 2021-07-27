"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("../flow/expect");
const pattern_1 = require("../pattern");
/**
 * Consumes all the given patterns and, in case of success, it will change the current output value.
 */
class Set extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Token value.
     */
    #value;
    /**
     * Default constructor.
     * @param value New value.
     * @param patterns Sequence of patterns.
     */
    constructor(value, ...patterns) {
        super();
        this.#target = new expect_1.default(...patterns);
        this.#value = value;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        if (this.#target.consume(source)) {
            source.output.value = this.#value;
            return true;
        }
        return false;
    }
}
exports.default = Set;
//# sourceMappingURL=set.js.map