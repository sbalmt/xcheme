"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
const expect_1 = require("../flow/expect");
/**
 * Consume all the given patterns and, in case of success,
 * it places the resulting node into the source output node.
 */
class Place extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Child node destination.
     */
    #current;
    /**
     * Default constructor.
     * @param current Child destination in the current node.
     * @param patterns Sequence of patterns.
     */
    constructor(current, ...patterns) {
        super();
        this.#target = new expect_1.default(...patterns);
        this.#current = current;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        const output = source.output;
        let current = output.node;
        output.node = void 0;
        const status = this.#target.consume(source);
        const child = output.node;
        if (status && child) {
            if (current) {
                const parent = current.getLowestChild(this.#current) ?? current;
                parent.setChild(this.#current, child);
            }
            else {
                current = child;
            }
        }
        output.node = current;
        return status;
    }
}
exports.default = Place;
//# sourceMappingURL=place.js.map