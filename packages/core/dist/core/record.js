"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A symbol record generated during the analysis process to be stored in the symbol table.
 */
class Record {
    /**
     * Record fragment.
     */
    #fragment;
    /**
     * Record node.
     */
    #node;
    /**
     * Record value.
     */
    #value;
    /**
     * Default constructor.
     * @param fragment Record fragment.
     * @param node Record node.
     * @param value Record value.
     */
    constructor(fragment, node, value) {
        this.#fragment = fragment;
        this.#node = node;
        this.#value = value;
    }
    /**
     * Get the record fragment.
     */
    get fragment() {
        return this.#fragment;
    }
    /**
     * Get the record node.
     */
    get node() {
        return this.#node;
    }
    /**
     * Get the record value.
     */
    get value() {
        return this.#value;
    }
}
exports.default = Record;
//# sourceMappingURL=record.js.map