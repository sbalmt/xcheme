"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
const expect_1 = require("./expect");
const try_1 = require("./try");
/**
 * Consume all the given patterns in this pattern and, in case of success, retry the consumption.
 */
class Repeat extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Triable pattern.
     */
    #triable;
    /**
     * Default constructor.
     * @param patterns Sequence of patterns.
     */
    constructor(...patterns) {
        super();
        this.#target = new expect_1.default(...patterns);
        this.#triable = new try_1.default(this.#target);
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        if (this.#target.consume(source)) {
            while (this.#triable.consume(source))
                ;
            return true;
        }
        return false;
    }
}
exports.default = Repeat;
//# sourceMappingURL=repeat.js.map