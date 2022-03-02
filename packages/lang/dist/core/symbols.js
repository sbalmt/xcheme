"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReferencedBy = exports.Aggregator = void 0;
/**
 * Symbol aggregator class.
 */
class Aggregator {
    /**
     * Symbol records.
     */
    #records = {};
    /**
     * Symbol links.
     */
    #links = {};
    /**
     * Symbols events.
     */
    #events = {};
    /**
     * Get the record that correspond to the given identifier.
     * @param identifier Record identifier.
     * @returns Returns the corresponding record.
     * @throws Throws an exception when the given record wasn't found.
     */
    #get(identifier) {
        if (!this.has(identifier)) {
            throw `A record named '${identifier}' doesn't exists.`;
        }
        return this.get(identifier);
    }
    /**
     * Determines whether or not a record with the given identifier exists.
     * @param identifier Record identifier.
     * @returns Returns true when the record exists, false otherwise.
     */
    has(identifier) {
        return this.#records[identifier] !== void 0 || this.#links[identifier] !== void 0;
    }
    /**
     * Get the record that correspond to the given identifier.
     * @param identifier Record identifier.
     * @returns Returns the corresponding record or undefined when it doesn't exists.
     */
    get(identifier) {
        return this.#records[identifier] ?? this.#links[identifier];
    }
    /**
     * Add the specified record,.
     * @param record Symbol record.
     * @throws Throws an error when the specified record already exists.
     * @returns Returns the added record.
     */
    add(record) {
        const { identifier } = record.data;
        if (!identifier || this.has(identifier)) {
            throw `A record named '${identifier}' can't be added.`;
        }
        const events = this.#events[identifier];
        this.#records[identifier] = record;
        if (events) {
            delete this.#events[identifier];
            for (const event of events) {
                event(record);
            }
        }
        return record;
    }
    /**
     * Link an existing record to another one.
     * @param identifier Record identifier.
     * @param alias Alias identifier.
     * @throws Throws an error when the specified alias already exists or the given identifier doesn't exists.
     * @returns Returns the linked record.
     */
    link(identifier, alias) {
        if (this.has(identifier)) {
            throw `An entry named '${identifier}' already exists.`;
        }
        const entry = this.#get(alias);
        this.#links[identifier] = entry;
        return entry;
    }
    /**
     * Add an event to be triggered once a record with the given identifier is added.
     * @param identifier Record identifier.
     * @param callback Trigger callback.
     */
    listen(identifier, callback) {
        const events = this.#events[identifier];
        if (!events) {
            this.#events[identifier] = [callback];
        }
        else {
            events.push(callback);
        }
    }
    /**
     * Iterable generator.
     */
    *[Symbol.iterator]() {
        for (const name in this.#records) {
            yield this.#records[name];
        }
    }
}
exports.Aggregator = Aggregator;
/**
 * Determines whether or not the given record is referenced.
 * @param record System record.
 * @param types Symbol types.
 * @returns Returns true when the record is referenced, false otherwise.
 */
const isReferencedBy = (record, ...types) => {
    const { dependents } = record.data;
    if (!dependents.includes(record)) {
        const references = dependents.reduce((previous, current) => {
            return types.includes(current.data.type) ? previous + 1 : previous;
        }, 0);
        return references > 1;
    }
    return true;
};
exports.isReferencedBy = isReferencedBy;
//# sourceMappingURL=symbols.js.map