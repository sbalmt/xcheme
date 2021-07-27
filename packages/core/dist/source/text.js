"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fragment_1 = require("../core/fragment");
const location_1 = require("../core/location");
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
    #state = { line: 0, column: 0, offset: 0 };
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
        return this.#state.offset;
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
        if (value === void 0) {
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
                const location = new location_1.default(state.line, state.column);
                return new fragment_1.default(this.#data, state.offset, this.offset, location);
            }
        }
        const length = this.offset + (this.length > 0 ? 1 : 0);
        const location = new location_1.default(this.#state.line, this.#state.column);
        return new fragment_1.default(this.#data, this.offset, length, location);
    }
    /**
     * Save the current source state.
     */
    saveState() {
        this.#states.push({ ...this.#state });
    }
    /**
     * Restore the previous source state.
     * @throws Throws an error when there's no state to restore.
     */
    restoreState() {
        if ((this.#state = this.#states[this.#states.length - 1]) === void 0) {
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
    move() {
        if (this.value !== '\n') {
            this.#state.column++;
        }
        else {
            this.#state.column = 0;
            this.#state.line++;
        }
        this.#state.offset++;
    }
}
exports.default = Text;
//# sourceMappingURL=text.js.map