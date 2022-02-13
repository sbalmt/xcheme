"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A range class.
 */
class Range {
    /**
     * Range begin.
     */
    #begin;
    /**
     * Range end.
     */
    #end;
    /**
     * Default constructor.
     * @param begin Range begin.
     * @param end Range end.
     */
    constructor(begin, end) {
        this.#begin = begin;
        this.#end = end;
    }
    /**
     * Get the range begin.
     */
    get begin() {
        return this.#begin;
    }
    /**
     * Get the range end.
     */
    get end() {
        return this.#end;
    }
    /**
     * Get the range length.
     */
    get length() {
        return this.#end - this.#begin;
    }
}
exports.default = Range;
//# sourceMappingURL=range.js.map