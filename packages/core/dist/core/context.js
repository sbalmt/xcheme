"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
const fragment_1 = require("./fragment");
const location_1 = require("./location");
const table_1 = require("./table");
const node_1 = require("./node");
/**
 * Contains the analysis context and depending on the solution, can store errors, tokens, symbols and
 * nodes from the current consumption.
 */
class Context {
    /**
     * Context errors.
     */
    #errors = [];
    /**
     * Context tokens.
     */
    #tokens = [];
    /**
     * Context symbol table.
     */
    #table = new table_1.default();
    /**
     * Context main node.
     */
    #node = new node_1.default(new fragment_1.default('', 0, 0, new location_1.default(0, 0)), this.#table, 0x00);
    /**
     * Context name.
     */
    #name;
    /**
     * Default constructor.
     * @param name Context name.
     */
    constructor(name) {
        this.#name = name;
    }
    /**
     * Get the error list.
     */
    get errors() {
        return this.#errors;
    }
    /**
     * Get the token list.
     */
    get tokens() {
        return this.#tokens;
    }
    /**
     * Get the symbol table.
     */
    get table() {
        return this.#table;
    }
    /**
     * Get the root node.
     */
    get node() {
        return this.#node;
    }
    /**
     * Get the context name.
     */
    get name() {
        return this.#name;
    }
    /**
     * Add a new error in the context.
     * @param fragment Error fragment.
     * @param value Error value.
     */
    addError(fragment, value) {
        this.#errors.push(new error_1.default(fragment, value));
    }
}
exports.default = Context;
//# sourceMappingURL=context.js.map