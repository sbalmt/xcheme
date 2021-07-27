"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
const expect_1 = require("./expect");
/**
 * Consumes all the given patterns and, in case of failure, it preserves the current source state.
 */
class Try extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Default constructor.
     * @param pattern Sequence of patterns.
     */
    constructor(...patterns) {
        super();
        this.#target = new expect_1.default(...patterns);
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        source.saveState();
        const status = this.#target.consume(source);
        if (!status) {
            source.restoreState();
        }
        source.discardState();
        return status;
    }
}
exports.default = Try;
//# sourceMappingURL=try.js.map