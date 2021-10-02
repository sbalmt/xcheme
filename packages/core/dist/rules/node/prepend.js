"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../source/base");
const node_1 = require("../../core/node");
const expect_1 = require("../flow/expect");
const pattern_1 = require("../pattern");
/**
 * Consume all the given patterns in this pattern and, in case of success,
 * it prepends a new node in the source output node.
 */
class Prepend extends pattern_1.default {
    /**
     * Head pattern.
     */
    #head;
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
     * @param head Prepend head pattern.
     * @param patterns Sequence of patterns.
     */
    constructor(value, output, current, head, ...patterns) {
        super();
        this.#head = head;
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
        const output = source.output;
        let current = output.node;
        output.node = void 0;
        let status = this.#head.consume(source);
        if (status) {
            const fragment = source.fragment;
            if ((status = this.#target.consume(source))) {
                const { table, value } = output;
                const result = this.#value === base_1.default.Output ? value ?? -1 : this.#value;
                const child = new node_1.default(fragment, result, table);
                child.setChild(this.#output, output.node);
                if (current) {
                    const parent = child.getLowestChild(this.#current) ?? child;
                    parent.setChild(this.#current, current);
                }
                current = child;
            }
        }
        output.node = current;
        source.discardState();
        return status;
    }
}
exports.default = Prepend;
//# sourceMappingURL=prepend.js.map