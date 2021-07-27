"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
/**
 * Consumes all patterns that are expected by this pattern.
 */
class Expect extends pattern_1.default {
    /**
     * Target patterns.
     */
    #targets;
    /**
     * Default constructor.
     * @param patterns Sequence of patterns.
     */
    constructor(...patterns) {
        super();
        this.#targets = patterns;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        for (const target of this.#targets) {
            if (!target.consume(source)) {
                return false;
            }
        }
        return true;
    }
}
exports.default = Expect;
//# sourceMappingURL=expect.js.map