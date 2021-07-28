"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../source/base");
const node_1 = require("../../core/node");
const expect_1 = require("../flow/expect");
const pattern_1 = require("../pattern");
/**
 * Consumes all the given patterns in this pattern and, in case of success,
 * it pivots the resulting node by the current source output node.
 */
class Pivot extends pattern_1.default {
    /**
     * Test pattern.
     */
    #test;
    /**
     * Target pattern.
     */
    #target;
    /**
     * Node value.
     */
    #value;
    /**
     * Output node destination.
     */
    #output;
    /**
     * Current node destination.
     */
    #current;
    /**
     * Default constructor.
     * @param value Node value.
     * @param output Output node destination.
     * @param current Current node destination.
     * @param test Pivot pattern.
     * @param patterns Sequence of patterns.
     */
    constructor(value, output, current, test, ...patterns) {
        super();
        if (current === output) {
            throw "Current and Output destinations can't have the same value.";
        }
        this.#test = test;
        this.#target = new expect_1.default(...patterns);
        this.#value = value;
        this.#output = output;
        this.#current = current;
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
            const output = source.output;
            const { table, value } = output;
            const result = this.#value === base_1.default.Output ? value ?? -1 : this.#value;
            const child = new node_1.default(source.fragment, table, result);
            const current = output.node;
            output.node = void 0;
            if (!(status = this.#target.consume(source))) {
                output.node = current;
            }
            else {
                child.setChild(this.#output, output.node);
                child.setChild(this.#current, current);
                output.node = child;
            }
        }
        source.discardState();
        return status;
    }
}
exports.default = Pivot;
//# sourceMappingURL=pivot.js.map