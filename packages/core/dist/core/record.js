"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A symbol record generated during the analysis process to be stored into the symbol table.
 */
class Record {
    /**
     * Record data map.
     */
    #data = {};
    /**
     * Record fragment.
     */
    #fragment;
    /**
     * Record value.
     */
    #value;
    /**
     * Record node.
     */
    #node;
    /**
     * Record table link.
     */
    #link;
    /**
     * Default constructor.
     * @param fragment Record fragment.
     * @param value Record value.
     * @param node Record node.
     * @param link Record table link.
     */
    constructor(fragment, value, node, link) {
        this.#fragment = fragment;
        this.#value = value;
        this.#node = node;
        this.#link = link;
    }
    /**
     * Get the record data map.
     */
    get data() {
        return this.#data;
    }
    /**
     * Get the record fragment.
     */
    get fragment() {
        return this.#fragment;
    }
    /**
     * Get the record value.
     */
    get value() {
        return this.#value;
    }
    /**
     * Get the record node.
     */
    get node() {
        return this.#node;
    }
    /**
     * Get the record table link.
     */
    get link() {
        return this.#link;
    }
}
exports.default = Record;
//# sourceMappingURL=record.js.map