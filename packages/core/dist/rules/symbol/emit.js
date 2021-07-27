"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../source/base");
const record_1 = require("../../core/record");
const pattern_1 = require("../pattern");
const expect_1 = require("../flow/expect");
/**
 * Consumes all the given patterns and, in case of success, it will emit a new symbol into the current symbol table.
 */
class Emit extends pattern_1.default {
    /**
     * Target pattern.
     */
    #target;
    /**
     * Symbol value.
     */
    #value;
    /**
     * Default constructor.
     * @param value Symbol value.
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
            const { node, value } = source.output;
            const result = this.#value === base_1.default.Output ? value ?? -1 : this.#value;
            const record = new record_1.default(source.fragment, node, result);
            source.emit(record);
        }
        source.discardState();
        return status;
    }
}
exports.default = Emit;
//# sourceMappingURL=emit.js.map