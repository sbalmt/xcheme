import * as Core from '@xcheme/core';
/**
 * Pattern entry.
 */
declare type Pattern = string | Core.Pattern;
/**
 * Entry types.
 */
export declare const enum Types {
    Undefined = 0,
    Normal = 1,
    Alias = 2
}
/**
 * Entry origins.
 */
export declare const enum Origins {
    Undefined = 0,
    User = 1,
    Loose = 2
}
/**
 * Map entry.
 */
export declare type Entry = {
    /**
     * Entry type.
     */
    type: Types;
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
     * Get all alias patterns.
     */
    get aliasPatterns(): Entry[];
    /**
     * Get all reference patterns.
     */
    get referencePatterns(): Entry[];
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
     * @param type Entry type.
     * @param origin Entry origin.
     * @param identifier Entry identifier.
     * @param identity Entry identity.
     * @param dynamic Determines whether or not the entry can have dynamic identity.
     * @throws Throws an error when the specified entry already exists.
     * @returns Returns the new entry.
     */
    add(type: Types, origin: Origins, identifier: string, identity: number, dynamic: boolean): Entry;
    /**
     * Link an existing entry to another name.
     * @param name Link name.
     * @param identifier Pattern identifier.
     * @throws Throws an error when the specified name already exists or the given identifier doesn't exists.
     * @returns Returns the linked entry.
     */
    link(name: string, identifier: string): Entry;
}
export {};
