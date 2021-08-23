"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern_1 = require("../pattern");
const try_1 = require("./try");
/**
 * Consume the test pattern and, in case of success, it also consumes the success pattern.
 * Otherwise, it will consume the failure pattern (when specified).
 */
class Condition extends pattern_1.default {
    /**
     * Test pattern.
     */
    #test;
    /**
     * Success pattern.
     */
    #success;
    /**
     * Failure pattern.
     */
    #failure;
    /**
     * Default constructor.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     */
    constructor(test, success, failure) {
        super();
        this.#test = new try_1.default(test);
        this.#success = success;
        this.#failure = failure;
    }
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source) {
        if (this.#test.consume(source)) {
            return this.#success.consume(source);
        }
        else if (this.#failure) {
            return this.#failure.consume(source);
        }
        return false;
    }
}
exports.default = Condition;
//# sourceMappingURL=condition.js.map