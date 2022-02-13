"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fragment_1 = require("../core/fragment");
const location_1 = require("../core/location");
const range_1 = require("../core/range");
const base_1 = require("./base");
/**
 * Data source for processing texts during the analysis process.
 */
class Text extends base_1.default {
    /**
     * Source data.
     */
    #data;
    /**
     * Source states.
     */
    #states = [];
    /**
     * Current source state.
     */
    #current = { line: 0, column: 0, offset: 0 };
    /**
     * Longest source state.
     */
    #longest = { ...this.#current };
    /**
     * Default constructor.
     * @param data Source data.
     * @param context Source context.
     */
    constructor(data, context) {
        super(context);
        this.#data = data;
    }
    /**
     * Get the current source offset.
     */
    get offset() {
        return this.#current.offset;
    }
    /**
     * Get the available source length.
     */
    get length() {
        return this.#data.length - this.offset;
    }
    /**
     * Get the current source value.
     * @throws Throws an error when the source is empty.
     */
    get value() {
        const value = this.#data[this.offset];
        if (!value) {
            throw "There's no value to get.";
        }
        return value;
    }
    /**
     * Get the current source fragment.
     * If there are pushed states, the fragment length will be based in the current and the previous pushed state.
     */
    get fragment() {
        if (this.#states.length > 0) {
            const state = this.#states[this.#states.length - 1];
            if (this.offset > state.offset) {
                const line = new range_1.default(state.line, this.#current.line);
                const column = new range_1.default(state.column, this.#current.column);
                const location = new location_1.default(this.name, line, column);
                return new fragment_1.default(this.#data, state.offset, this.offset, location);
            }
        }
        const line = new range_1.default(this.#current.line, this.#current.line);
        const column = new range_1.default(this.#current.column, this.#current.column);
        const location = new location_1.default(this.name, line, column);
        const length = this.offset + (this.length > 0 ? 1 : 0);
        return new fragment_1.default(this.#data, this.offset, length, location);
    }
    /**
     * Get the current state.
     */
    get currentState() {
        return this.#current;
    }
    /**
     * Get the longest state.
     */
    get longestState() {
        return this.#longest;
    }
    /**
     * Save the current source state.
     */
    saveState() {
        this.#states.push({ ...this.#current });
    }
    /**
     * Restore the previous source state.
     * @throws Throws an error when there's no state to restore.
     */
    restoreState() {
        if (!(this.#current = this.#states[this.#states.length - 1])) {
            throw "There's no state to restore.";
        }
    }
    /**
     * Discard the current source state.
     */
    discardState() {
        this.#states.pop();
    }
    /**
     * Move to the next source state.
     */
    nextState() {
        if (this.value !== '\n') {
            this.#current.column++;
        }
        else {
            this.#current.column = 0;
            this.#current.line++;
        }
        this.#current.offset++;
        if (this.#current.offset > this.#longest.offset) {
            this.#longest = { ...this.#current };
        }
    }
}
exports.default = Text;
//# sourceMappingURL=text.js.map