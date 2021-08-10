import * as Core from '@xcheme/core';
/**
 * Pattern entry.
 */
declare type Pattern = string | Core.Pattern;
/**
 * Entry types.
 */
export declare const enum Types {
    Normal = 0,
    Alias = 1,
    Loose = 2
}
/**
 * Map entry.
 */
export declare type Entry = {
    /**
     * Entry identity.
     */
    identity: number;
    /**
     * Entry type.
     */
    type: Types;
    /**
     * Entry name.
     */
    name: string;
    /**
     * Entry pattern.
     */
    pattern: Pattern;
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
     * Get all loose patterns.
     */
    get loosePatterns(): Entry[];
    /**
     * Determines whether or not the aggregator contains an entry with the given name.
     * @param name Pattern entry name.
     * @returns Returns true when the specified entry exists, false otherwise.
     */
    has(name: string): boolean;
    /**
     * Get the entry that correspond to the given name.
     * @param name Pattern entry name.
     * @returns Returns the corresponding entry or undefined when it doesn't exists.
     */
    get(name: string): Entry | undefined;
    /**
     * Add a new pattern entry.
     * @param identity Entry identity.
     * @param name Entry name.
     * @param pattern Entry patterns.
     * @param type Entry type.
     * @throws Throws an error when the specified entry already exists.
     */
    add(identity: number, name: string, pattern: Pattern, type: Types): void;
}
export {};
