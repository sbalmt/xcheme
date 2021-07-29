"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../source/base");
const record_1 = require("../../core/record");
const pattern_1 = require("../pattern");
const expect_1 = require("../flow/expect");
const error_1 = require("../../core/error");
/**
 * Consumes all the given patterns and, in case of success, it will emit a new symbol into the current symbol table.
 */
class Emit extends pattern_1.default {
    /**
     * Test pattern.
     */
    #test;
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
     * @param test Symbol pattern.
     * @param patterns Sequence of patterns.
     */
    constructor(value, test, ...patterns) {
        super();
        this.#test = test;
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
        let status = this.#test.consume(source);
        if (status) {
            const { node, table, value } = source.output;
            const fragment = source.fragment;
            if ((status = this.#target.consume(source))) {
                if (table.hasRecord(fragment)) {
                    const error = new error_1.default(fragment, -1);
                    source.emit(error);
                }
                else {
                    const result = this.#value === base_1.default.Output ? value ?? -1 : this.#value;
                    const record = new record_1.default(fragment, node, result);
                    source.emit(record);
                }
            }
        }
        source.discardState();
        return status;
    }
}
exports.default = Emit;
//# sourceMappingURL=emit.js.map