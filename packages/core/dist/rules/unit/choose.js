"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
const uncase_1 = require("../transform/uncase");
/**
 * Consume one unit that is between all the acceptable units in the pattern.
 */
class Choose extends pattern_1.default {
    /**
     * Set of units.
     */
    #units;
    /**
     * Default constructor.
     * @param units List of acceptable units.
     */
    constructor(...units) {
        super();
        this.#units = new Set(units);
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        if (source.length > 0) {
            const unit = uncase_1.default.transform(source.value);
            if (this.#units.has(unit)) {
                source.nextState();
                return true;
            }
        }
        return false;
    }
}
exports.default = Choose;
//# sourceMappingURL=choose.js.map