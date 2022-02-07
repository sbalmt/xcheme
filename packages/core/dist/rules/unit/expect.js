"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
const uncase_1 = require("../transform/uncase");
/**
 * Consume all the units that are expected by the pattern.
 */
class Expect extends pattern_1.default {
    /**
     * Array of units.
     */
    #units;
    /**
     * Default constructor.
     * @param units List of expected units.
     */
    constructor(...units) {
        super();
        this.#units = units;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        for (const unit of this.#units) {
            if (source.length === 0 || unit !== uncase_1.default.transform(source.value)) {
                return false;
            }
            source.nextState();
        }
        return true;
    }
}
exports.default = Expect;
//# sourceMappingURL=expect.js.map