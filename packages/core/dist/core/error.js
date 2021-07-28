"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An error product to compose the error list generated in the analysis process.
 */
class Error {
    /**
     * Error fragment.
     */
    #fragment;
    /**
     * Error value.
     */
    #value;
    /**
     * Default constructor.
     * @param fragment Error fragment.
     * @param value Error value.
     */
    constructor(fragment, value) {
        this.#fragment = fragment;
        this.#value = value;
    }
    /**
     * Get the error fragment.
     */
    get fragment() {
        return this.#fragment;
    }
    /**
     * Get the error value.
     */
    get value() {
        return this.#value;
    }
}
exports.default = Error;
//# sourceMappingURL=error.js.map