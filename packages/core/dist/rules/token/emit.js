"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../source/base");
const token_1 = require("../../core/token");
const expect_1 = require("../flow/expect");
const pattern_1 = require("../pattern");
/**
 * Consumes all the given patterns and, in case of success, it will emit a new token into the current token list.
 */
class Emit extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Token value.
     */
    #value;
    /**
     * Default constructor.
     * @param value Token value.
     * @param patterns Sequence of patterns.
     */
    constructor(value, ...patterns) {
        super();
        this.#target = new expect_1.default(...patterns);
        this.#value = value;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        source.saveState();
        const status = this.#target.consume(source);
        if (status) {
            const { value } = source.output;
            const result = this.#value === base_1.default.Output ? value ?? -1 : this.#value;
            const token = new token_1.default(source.fragment, result);
            source.emit(token);
        }
        source.discardState();
        return status;
    }
}
exports.default = Emit;
//# sourceMappingURL=emit.js.map