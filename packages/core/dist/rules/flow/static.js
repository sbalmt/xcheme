"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
/**
 * Doesn't consume anything and returns the static state given for this pattern.
 */
class Static extends pattern_1.default {
    /**
     * Static value.
     */
    #value;
    /**
     * Default constructor.
     * @param value Static value.
     */
    constructor(value) {
        super();
        this.#value = value;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns the static result.
     */
    consume(source) {
        return this.#value;
    }
}
exports.default = Static;
//# sourceMappingURL=static.js.map