"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggregator = void 0;
/**
 * Aggregate pattern entries during the making process.
 */
class Aggregator {
    /**
     * Entry map.
     */
    #entries = {};
    /**
     * Link map.
     */
    #links = {};
    /**
     * Get all patterns.
     */
    get patterns() {
        return Object.values(this.#entries).filter((entry) => entry.references === 0 && entry.type === 1 /* Normal */);
    }
    /**
     * Get all alias patterns.
     */
    get aliasPatterns() {
        return Object.values(this.#entries).filter((entry) => entry.references === 0 && entry.type === 2 /* Alias */);
    }
    /**
     * Get all reference patterns.
     */
    get referencePatterns() {
        return Object.values(this.#entries).filter((entry) => entry.references > 0);
    }
    /**
     * Determines whether or not the aggregator contains an entry with the given name.
     * @param name Entry name.
     * @returns Returns true when the specified entry exists, false otherwise.
     */
    has(name) {
        return this.#entries[name] !== void 0 || this.#links[name] !== void 0;
    }
    /**
     * Get the entry that correspond to the given name.
     * @param name Entry name.
     * @returns Returns the corresponding entry or undefined when it doesn't exists.
     */
    get(name) {
        return this.#entries[name] ?? this.#links[name];
    }
    /**
     * Add a new pattern entry.
     * @param type Entry type.
     * @param origin Entry origin.
     * @param identifier Entry identifier.
     * @param identity Entry identity.
     * @param dynamic Determines whether or not the entry can have dynamic identity.
     * @throws Throws an error when the specified entry already exists.
     * @returns Returns the new entry.
     */
    add(type, origin, identifier, identity, dynamic) {
        if (this.has(identifier)) {
            throw `An entry named '${name}' already exists.`;
        }
        return (this.#entries[identifier] = {
            type,
            origin,
            identifier,
            identity,
            dynamic,
            references: 0,
            pattern: undefined
        });
    }
    /**
     * Link an existing entry to another name.
     * @param name Link name.
     * @param identifier Pattern identifier.
     * @throws Throws an error when the specified name already exists or the given identifier doesn't exists.
     * @returns Returns the linked entry.
     */
    link(name, identifier) {
        if (this.has(name)) {
            throw `An entry named '${name}' already exists.`;
        }
        else if (!this.has(identifier)) {
            throw `An entry named '${identifier}' doesn't exists.`;
        }
        return (this.#links[name] = this.get(identifier));
    }
}
exports.Aggregator = Aggregator;
//# sourceMappingURL=entries.js.map