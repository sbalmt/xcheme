"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
/**
 * Counter context class.
 */
class Context {
    /**
     * Counter cache.
     */
    #cache = new WeakMap();
    /**
     * Get the current counter value for the specified key object.
     * @param object Key object.
     * @param initial Initial value.
     * @returns Returns the counter value.
     */
    count(object, initial = 0) {
        return this.#cache.get(object) ?? initial;
    }
    /**
     * Increment the counter value for the specified key object.
     * @param object Key object.
     * @param initial Initial value.
     * @returns Returns the previous counter value.
     */
    increment(object, initial = 0) {
        const value = this.count(object, initial);
        this.#cache.set(object, value + 1);
        return value;
    }
}
exports.Context = Context;
//# sourceMappingURL=counter.js.map