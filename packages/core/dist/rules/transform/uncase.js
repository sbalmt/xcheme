"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("../flow/expect");
const pattern_1 = require("../pattern");
/**
 * Consumes all the given patterns with the uncase transformation.
 */
class Uncase extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Default constructor.
     * @param patterns Sequence of patterns.
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
        const current = Uncase.#state;
        Uncase.#state = true;
        const result = this.#target.consume(source);
        Uncase.#state = current;
        return result;
    }
    /**
     * Current state.
     */
    static #state = false;
    /**
     * Transform the given unit according to the current state.
     * @param unit Input unit.
     * @returns Returns the unit transformation.
     */
    static transform(unit) {
        return Uncase.active && typeof unit === 'string' ? unit.toLocaleLowerCase() : unit;
    }
    /**
     * Determines whether or not the uncase is active.
     */
    static get active() {
        return Uncase.#state;
    }
}
exports.default = Uncase;
//# sourceMappingURL=uncase.js.map