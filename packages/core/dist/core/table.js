"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fragment_1 = require("./fragment");
/**
 * A symbol table for storing symbol records generated during the analysis process.
 */
class Table {
    /**
     * Table of records.
     */
    #records = {};
    /**
     * Table length.
     */
    #length = 0;
    /**
     * Parent table.
     */
    #parent;
    /**
     * Default constructor.
     * @param parent Parent table.
     */
    constructor(parent) {
        this.#parent = parent;
    }
    /**
     * Get the parent table.
     */
    get parent() {
        return this.#parent;
    }
    /**
     * Get all record keys in this table.
     */
    get keys() {
        return Object.keys(this.#records);
    }
    /**
     * Get the number of entries in this table.
     */
    get length() {
        return this.#length;
    }
    /**
     * Get the symbol record that corresponds to the specified key.
     * @param key Symbol record key.
     * @returns Returns the corresponding record or undefined when the record wasn't found.
     */
    getRecord(key) {
        return this.#records[key instanceof fragment_1.default ? key.data : key];
    }
    /**
     * Add a new symbol record into the symbol table.
     * @param record Symbol record.
     * @throw Throws an error when a symbol record with the same fragment data already exists.
     */
    addRecord(record) {
        const key = record.fragment.data;
        if (this.#records[key]) {
            throw 'Unable to add records with duplicate fragment data.';
        }
        this.#records[key] = record;
        this.#length++;
    }
}
exports.default = Table;
//# sourceMappingURL=table.js.map