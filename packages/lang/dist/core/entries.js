"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggregator = void 0;
/**
 * Aggregate pattern entries during the making process.
 */
class Aggregator {
    /**
     * Entries map.
     */
    #map = {};
    /**
     * Get all patterns.
     */
    get patterns() {
        return Object.values(this.#map).filter((entry) => entry.type === 0 /* Normal */);
    }
    /**
     * Get all alias patterns.
     */
    get aliasPatterns() {
        return Object.values(this.#map).filter((entry) => entry.type === 1 /* Alias */);
    }
    /**
     * Determines whether or not the aggregator contains an entry with the given name.
     * @param name Pattern entry name.
     * @returns Returns true when the specified entry exists, false otherwise.
     */
    has(name) {
        return this.#map[name] !== void 0;
    }
    /**
     * Get the entry that correspond to the given name.
     * @param name Pattern entry name.
     * @returns Returns the corresponding entry or undefined when it doesn't exists.
     */
    get(name) {
        return this.#map[name];
    }
    /**
     * Add a new pattern entry.
     * @param type Entry type.
     * @param name Entry name.
     * @param identity Entry identity.
     * @param pattern Entry patterns.
     * @throws Throws an error when the specified entry already exists.
     */
    add(type, name, identity, pattern) {
        if (this.#map[name]) {
            throw `Pattern entry '${name}' already exists.`;
        }
        this.#map[name] = {
            type,
            name,
            identity,
            pattern
        };
    }
}
exports.Aggregator = Aggregator;
//# sourceMappingURL=entries.js.map