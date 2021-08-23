"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
/**
 * Consume the pattern object returned by the callback given for this pattern.
 */
class Run extends pattern_1.default {
    /**
     * Callback for the pattern.
     */
    #callback;
    /**
     * Default constructor.
     * @param callback Callback for the pattern.
     */
    constructor(callback) {
        super();
        this.#callback = callback;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        return this.#callback().consume(source);
    }
}
exports.default = Run;
//# sourceMappingURL=run.js.map