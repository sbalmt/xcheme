"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../core/error");
const token_1 = require("../core/token");
const node_1 = require("../core/node");
const record_1 = require("../core/record");
const table_1 = require("../core/table");
/**
 * Base of any data source for the analysis process.
 */
class Base {
    /**
     * Source context.
     */
    #context;
    /**
     * Current symbol table manager.
     */
    #table;
    /**
     * Current source output.
     */
    #output;
    /**
     * Magic value for getting the current output value from the current source.
     */
    static get Output() {
        return 0xffffffff;
    }
    /**
     * Default constructor.
     * @param context Source context.
     */
    constructor(context) {
        this.#context = context;
        this.#table = context.table;
        this.#output = {
            state: 0,
            table: this.#table
        };
    }
    /**
     * Get the source context name.
     */
    get name() {
        return this.#context.name;
    }
    /**
     * Get the current source output.
     */
    get output() {
        return this.#output;
    }
    /**
     * Should be implemented to return the current source offset.
     */
    get offset() {
        throw "Property doesn't implemented.";
    }
    /**
     * Should be implemented to return the current source length.
     */
    get length() {
        throw "Property doesn't implemented.";
    }
    /**
     * Should be implemented to return the current source value.
     */
    get value() {
        throw "Property doesn't implemented.";
    }
    /**
     * Should be implemented to return the current source fragment.
     */
    get fragment() {
        throw "Property doesn't implemented.";
    }
    /**
     * Should be implement to push the current source state.
     */
    saveState() {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to restore the previous source state.
     */
    restoreState() {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to pop the previous source state.
     */
    discardState() {
        throw "Method doesn't implemented.";
    }
    /**
     * Should be implemented to move to the next source state.
     */
    nextState() {
        throw "Move method doesn't implemented.";
    }
    /**
     * Emit the given product in the current source context.
     * @param product Input product.
     * @throws Throws an error when the given product isn't supported.
     */
    emit(product) {
        if (product instanceof error_1.default) {
            this.#context.errors.push(product);
        }
        else if (product instanceof token_1.default) {
            this.#context.tokens.push(product);
        }
        else if (product instanceof node_1.default) {
            const root = this.#context.node.getLowestChild(2 /* Next */) ?? this.#context.node;
            root.setChild(2 /* Next */, product);
        }
        else if (product instanceof record_1.default) {
            this.#table.add(product);
        }
        else {
            throw 'Unsupported product type.';
        }
    }
    /**
     * Open a new symbol table.
     */
    openTable() {
        this.#table = new table_1.default(this.#table);
        this.#output.table = this.#table;
    }
    /**
     * Close the current symbol table.
     * @throws Throws an error when there's no parent symbol table to be collapsed.
     */
    closeTable() {
        if (!this.#table.parent) {
            throw "There's no parent symbol table to collapse.";
        }
        if (this.#table.length > 0) {
            this.#output.link = this.#table;
        }
        this.#table = this.#table.parent;
        this.#output.table = this.#table;
    }
}
exports.default = Base;
//# sourceMappingURL=base.js.map