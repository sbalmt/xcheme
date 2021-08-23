"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
const try_1 = require("./try");
/**
 * Consume the first matching pattern in the list of patterns.
 */
class Choose extends pattern_1.default {
    /**
     * List of target patterns.
     */
    #targets;
    /**
     * Default constructor.
     * @param patterns List of patterns.
     */
    constructor(...patterns) {
        super();
        this.#targets = patterns.map((pattern) => new try_1.default(pattern));
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        for (const target of this.#targets) {
            if (target.consume(source)) {
                return true;
            }
        }
        return false;
    }
}
exports.default = Choose;
//# sourceMappingURL=choose.js.map