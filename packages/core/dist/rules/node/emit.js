"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../source/base");
const node_1 = require("../../core/node");
const expect_1 = require("../flow/expect");
const pattern_1 = require("../pattern");
/**
 * Consumes all the given patterns and, in case of success, it will emit a new node as the next child of the current node.
 * Any working node in the current source output will be attached as the left child from the new node.
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
     * @throws Throws an error when there's no node to emit.
     */
    consume(source) {
        source.saveState();
        const status = this.#target.consume(source);
        if (status) {
            const { table, value } = source.output;
            const result = this.#value === base_1.default.Output ? value ?? -1 : this.#value;
            const node = new node_1.default(source.fragment, table, result);
            node.setChild(0 /* Left */, source.output.node);
            source.output.node = void 0;
            source.emit(node);
        }
        source.discardState();
        return status;
    }
}
exports.default = Emit;
//# sourceMappingURL=emit.js.map