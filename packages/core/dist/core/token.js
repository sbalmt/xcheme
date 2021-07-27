"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A token product to compose the token list generated in the analysis process.
 */
class Token {
    /**
     * Token fragment.
     */
    #fragment;
    /**
     * Token value.
     */
    #value;
    /**
     * Default constructor.
     * @param fragment Token fragment.
     * @param value Token value.
     */
    constructor(fragment, value) {
        this.#fragment = fragment;
        this.#value = value;
    }
    /**
     * Get the token fragment.
     */
    get fragment() {
        return this.#fragment;
    }
    /**
     * Get the token value.
     */
    get value() {
        return this.#value;
    }
}
exports.default = Token;
//# sourceMappingURL=token.js.map