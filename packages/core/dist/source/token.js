"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fragment_1 = require("../core/fragment");
const base_1 = require("./base");
/**
 * Data source for processing tokens during the analysis.
 */
class TokenSource extends base_1.default {
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
    #current = { offset: 0 };
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
     * Get the current source length.
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
        if (value === void 0) {
            throw "There's no value to get.";
        }
        return value.value;
    }
    /**
     * Get the current source fragment.
     */
    get fragment() {
        if (this.#states.length > 0) {
            const state = this.#states[this.#states.length - 1];
            if (this.offset > state.offset) {
                const first = this.#data[state.offset].fragment;
                const last = this.#data[Math.max(0, this.offset - 1)].fragment;
                return new fragment_1.default(first.source, first.begin, last.end, first.location);
            }
        }
        const offset = Math.min(this.offset, this.#data.length - 1);
        return this.#data[offset].fragment;
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
        if ((this.#current = this.#states[this.#states.length - 1]) === void 0) {
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
        this.#current.offset++;
        if (this.#current.offset > this.#longest.offset) {
            this.#longest = { ...this.#current };
        }
    }
}
exports.default = TokenSource;
//# sourceMappingURL=token.js.map