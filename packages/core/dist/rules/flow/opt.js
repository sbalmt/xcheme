"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
const try_1 = require("./try");
/**
 * Consumes all the given patterns in this pattern without raising a consumption failure.
 */
class Option extends pattern_1.default {
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
     * @returns Returns true anyways.
     */
    consume(source) {
        this.#target.consume(source);
        return true;
    }
}
exports.default = Option;
//# sourceMappingURL=opt.js.map