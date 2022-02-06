"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggregator = void 0;
/**
 * Aggregate pattern entries during the making process.
 */
class Aggregator {
    /**
     * Aggregator name.
     */
    #name;
    /**
     * Aggregator location.
     */
    #location;
    /**
     * Entry map.
     */
    #entries = {};
    /**
     * Link map.
     */
    #links = {};
    /**
     * Event map.
     */
    #events = {};
    /**
     * Get the entry that correspond to the given name.
     * @param name Entry name.
     * @returns Returns the corresponding entry.
     * @throws Throws an exception when the given entry wasn't found.
     */
    #get(name) {
        if (!this.has(name)) {
            throw `An entry named '${name}' doesn't exists.`;
        }
        return this.get(name);
    }
    /**
     * Default constructor.
     * @param name Aggregator name.
     * @param location Aggregator location.
     */
    constructor(name, location) {
        this.#name = name;
        this.#location = location;
    }
    /**
     * Get the aggregator name.
     */
    get name() {
        return this.#name;
    }
    /**
     * Get the aggregator location.
     */
    get location() {
        return this.#location;
    }
    /**
     * Get all entries.
     */
    get all() {
        return Object.values(this.#entries);
    }
    /**
     * Get all alias entries.
     */
    get aliases() {
        return this.all.filter((entry) => entry.alias);
    }
    /**
     * Get all exported entries.
     */
    get exports() {
        return this.all.filter((entry) => entry.exported);
    }
    /**
     * Get all imported entries.
     */
    get imports() {
        return this.all.filter((entry) => entry.imported);
    }
    /**
     * Get all pattern entries.
     */
    get patterns() {
        return this.all.filter((entry) => !entry.alias && !entry.references);
    }
    /**
     * Get all reference entries.
     */
    get references() {
        return this.all.filter((entry) => entry.references > 0);
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
     * Get an array containing all entries that corresponds to one or more specified types.
     * @param types Entry types.
     * @returns Returns an array containing all entries found.
     */
    getAllByType(types) {
        return this.all.filter((entry) => types.includes(entry.type));
    }
    /**
     * Get an array containing all exported entries that corresponds to one or more specified types.
     * @param types Entry types.
     * @returns Returns an array containing all entries found.
     */
    getExportsByType(types) {
        return this.all.filter((entry) => entry.exported && types.includes(entry.type));
    }
    /**
     * Get an array containing all imported entries that corresponds to one or more specified types.
     * @param types Entry types.
     * @returns Returns an array containing all entries found.
     */
    getImportsByType(types) {
        return this.all.filter((entry) => entry.exported && types.includes(entry.type));
    }
    /**
     * Get an array containing all pattern entries that corresponds to one or more specified types.
     * @param types Entry types.
     * @returns Returns an array containing all entries found.
     */
    getPatternsByType(types) {
        return this.all.filter((entry) => !entry.alias && !entry.references && types.includes(entry.type));
    }
    /**
     * Get an array containing all reference entries that corresponds to one or more specified types.
     * @param types Entry types.
     * @returns Returns an array containing all entries found.
     */
    getReferencesByType(types) {
        return this.all.filter((entry) => entry.references > 0 && types.includes(entry.type));
    }
    /**
     * Add the specified pattern entry.
     * @param entry Pattern entry.
     * @throws Throws an error when the specified entry already exists.
     * @returns Returns the added entry.
     */
    add(entry) {
        const { identifier } = entry;
        if (this.has(identifier)) {
            throw `Another entry named '${identifier}' can't be added.`;
        }
        const events = this.#events[identifier];
        this.#entries[identifier] = entry;
        if (events) {
            delete this.#events[identifier];
            for (const event of events) {
                event(entry);
            }
        }
        return entry;
    }
    /**
     * Create and add a new pattern entry.
     * @param type Entry type.
     * @param origin Entry origin.
     * @param identifier Entry identifier.
     * @param identity Entry identity.
     * @param model Optional entry model.
     * @throws Throws an error when the specified entry already exists.
     * @returns Returns the added entry.
     */
    create(type, origin, identifier, identity, model) {
        return this.add({
            name: `${this.#name}:${identifier}`,
            type,
            origin,
            identifier,
            identity,
            alias: model?.alias ?? false,
            dynamic: model?.dynamic ?? false,
            exported: model?.exported ?? false,
            imported: model?.imported ?? false,
            references: model?.references ?? 0,
            dependencies: model?.dependencies ?? [],
            location: model?.location ?? this.#location,
            primary: model?.primary,
            pattern: model?.pattern
        });
    }
    /**
     * Link an existing entry to another one.
     * @param identifier Link identifier.
     * @param alias Alias identifier.
     * @throws Throws an error when the specified name already exists or the given identifier doesn't exists.
     * @returns Returns the linked entry.
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
     * Add an event to be triggered once when an entry with the given identifier is added.
     * @param identifier Entry identifier.
     * @param callback Trigger callback.
     */
    on(identifier, callback) {
        const events = this.#events[identifier];
        if (!events) {
            this.#events[identifier] = [callback];
        }
        else {
            events.push(callback);
        }
    }
}
exports.Aggregator = Aggregator;
//# sourceMappingURL=entries.js.map