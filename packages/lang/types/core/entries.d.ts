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
     * Entry origin.
     */
    origin: Origins;
    /**
     * Entry identifier.
     */
    identifier: string;
    /**
     * Entry identity.
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
     * Number of references to the entry.
     */
    references: number;
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
     * Get all patterns.
     */
    get patterns(): Entry[];
    /**
     * Get all reference patterns.
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
     * Add a new pattern entry.
     * @param origin Entry origin.
     * @param identifier Entry identifier.
     * @param identity Entry identity.
     * @throws Throws an error when the specified entry already exists.
     * @returns Returns the new entry.
     */
    add(origin: Origins, identifier: string, identity: number, model?: Partial<Entry>): Entry;
    /**
     * Link an existing entry to another name.
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
