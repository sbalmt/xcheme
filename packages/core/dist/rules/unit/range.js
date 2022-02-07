"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
const uncase_1 = require("../transform/uncase");
/**
 * Consume one unit that is in the range accepted by the pattern.
 */
class Range extends pattern_1.default {
    /**
     * Beginning of the boundary unit.
     */
    #begin;
    /**
     * End of the boundary unit.
     */
    #end;
    /**
     * Default constructor.
     * @param begin Beginning of the boundary unit.
     * @param end End of the boundary unit.
     */
    constructor(begin, end) {
        super();
        this.#begin = begin;
        this.#end = end;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        if (source.length > 0) {
            const unit = uncase_1.default.transform(source.value);
            if (unit >= this.#begin && unit <= this.#end) {
                source.nextState();
                return true;
            }
        }
        return false;
    }
}
exports.default = Range;
//# sourceMappingURL=range.js.map