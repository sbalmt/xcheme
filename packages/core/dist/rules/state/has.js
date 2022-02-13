"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("../flow/expect");
const pattern_1 = require("../pattern");
/**
 * Consume all the given patterns when the specified state value is defined.
 */
class Has extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * State value.
     */
    #value;
    /**
     * Default constructor.
     * @param value State value.
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
        if (source.output.state === this.#value) {
            return this.#target.consume(source);
        }
        return false;
    }
}
exports.default = Has;
//# sourceMappingURL=has.js.map