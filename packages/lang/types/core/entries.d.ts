import * as Core from '@xcheme/core';
/**
 * Pattern entry.
 */
declare type Pattern = string | Core.Pattern;
/**
 * Event callback.
 */
declare type EventCallback = (entry: Entry) => void;
/**
 * Entry types.
 */
export declare const enum Types {
    Unknown = 0,
    Skip = 1,
    Token = 2,
    Node = 3
}
/**
 * Entry origins.
 */
export declare const enum Origins {
    User = 0,
    Loose = 1
}
/**
 * Map entry.
 */
export declare type Entry = {
    /**
     * Entry name.
     */
    name: string;
    /**
     * Entry type.
     */
    type: Types;
    /**
     * Determine whether or not an entry was created by a user directive or a loose token.
     */
    origin: Origins;
    /**
     * Unique identifier used for locating the entry.
     */
    identifier: string;
    /**
     * Unique identity number for the entry.
     */
    identity: number;
    /**
     * Determines whether or not the entry is an alias.
     */
    alias: boolean;
    /**
     * Determines whether or not the entry can have a dynamic identity.
     */
    dynamic: boolean;
    /**
     * Determines whether or not the entry can be exported.
     */
    exported: boolean;
    /**
     * Determines whether or not the entry is imported.
     */
    imported: boolean;
    /**
     * Number of references to the entry.
     */
    references: number;
    /**
     * Entry dependencies.
     */
    dependencies: Entry[];
    /**
     * Entry dependents.
     */
    dependents: Entry[];
    /**
     * Entry location.
     */
    location: string;
    /**
     * Entry pattern.
     */
    pattern: Pattern | undefined;
};
/**
 * Aggregate pattern entries during the making process.
 */
export declare class Aggregator {
    #private;
    /**
     * Default constructor.
     * @param name Aggregator name.
     * @param location Aggregator location.
     */
    constructor(name: string, location: string);
    /**
     * Get the aggregator name.
     */
    get name(): string;
    /**
     * Get the aggregator location.
     */
    get location(): string;
    /**
     * Get all entries.
     */
    get all(): Entry[];
    /**
     * Get all alias entries.
     */
    get aliases(): Entry[];
    /**
     * Get all exported entries.
     */
    get exports(): Entry[];
    /**
     * Get all imported entries.
     */
    get imports(): Entry[];
    /**
     * Get all pattern entries.
     */
    get patterns(): Entry[];
    /**
     * Get all reference entries.
     */
    get references(): Entry[];
    /**
     * Determines whether or not the aggregator contains an entry with the given name.
     * @param name Entry name.
     * @returns Returns true when the specified entry exists, false otherwise.
     */
    has(name: string): boolean;
    /**
     * Get the entry that correspond to the given name.
     * @param name Entry name.
     * @returns Returns the corresponding entry or undefined when it doesn't exists.
     */
    get(name: string): Entry | undefined;
    /**
     * Get an array containing all entries that corresponds to one or more specified types.
     * @param types Entry types.
     * @returns Returns an array containing all entries found.
     */
    getAllByType(types: Types[]): Entry[];
    /**
     * Get an array containing all exported entries that corresponds to one or more specified types.
     * @param types Entry types.
     * @returns Returns an array containing all entries found.
     */
    getExportsByType(types: Types[]): Entry[];
    /**
     * Get an array containing all imported entries that corresponds to one or more specified types.
     * @param types Entry types.
     * @returns Returns an array containing all entries found.
     */
    getImportsByType(types: Types[]): Entry[];
    /**
     * Get an array containing all pattern entries that corresponds to one or more specified types.
     * @param types Entry types.
     * @returns Returns an array containing all entries found.
     */
    getPatternsByType(types: Types[]): Entry[];
    /**
     * Get an array containing all reference entries that corresponds to one or more specified types.
     * @param types Entry types.
     * @returns Returns an array containing all entries found.
     */
    getReferencesByType(types: Types[]): Entry[];
    /**
     * Add the specified pattern entry.
     * @param entry Pattern entry.
     * @throws Throws an error when the specified entry already exists.
     * @returns Returns the added entry.
     */
    add(entry: Entry): Entry;
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
    create(type: Types, origin: Origins, identifier: string, identity: number, model?: Partial<Entry>): Entry;
    /**
     * Link an existing entry to another one.
     * @param identifier Link identifier.
     * @param alias Alias identifier.
     * @throws Throws an error when the specified name already exists or the given identifier doesn't exists.
     * @returns Returns the linked entry.
     */
    link(identifier: string, alias: string): Entry;
    /**
     * Add an event to be triggered once when an entry with the given identifier is added.
     * @param identifier Entry identifier.
     * @param callback Trigger callback.
     */
    on(identifier: string, callback: EventCallback): void;
}
export {};
