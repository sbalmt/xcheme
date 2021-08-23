"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
const try_1 = require("./try");
/**
 * Consume all the given patterns and invert the consumption state.
 */
class Not extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Default constructor.
     * @param patterns Sequence of patterns.
     */
    constructor(...patterns) {
        super();
        this.#target = new try_1.default(...patterns);
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns the inverted consumption state.
     */
    consume(source) {
        if (source.length > 0) {
            return !this.#target.consume(source);
        }
        return false;
    }
}
exports.default = Not;
//# sourceMappingURL=not.js.map