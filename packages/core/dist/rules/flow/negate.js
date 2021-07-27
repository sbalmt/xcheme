"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
const try_1 = require("./try");
/**
 * Consumes all the given patterns and negate the consumption result.
 */
class Negate extends pattern_1.default {
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
     * @returns Returns the negated consumption result.
     */
    consume(source) {
        if (source.length > 0) {
            return !this.#target.consume(source);
        }
        return false;
    }
}
exports.default = Negate;
//# sourceMappingURL=negate.js.map