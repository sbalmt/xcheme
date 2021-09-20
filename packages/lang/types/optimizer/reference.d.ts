/**
 * Reference types.
 */
export declare const enum Types {
    Undefined = 0,
    User = 1,
    Loose = 2
}
/**
 * Reference entry.
 */
export declare type Entry = {
    /**
     * Reference type.
     */
    type: Types;
    /**
     * Reference identifier.
     */
    identifier: string;
    /**
     * Reference identity.
     */
    identity: number;
    /**
     * Determines whether or not the entry can have a dynamic identity.
     */
    dynamic: boolean;
};
/**
 * Reference Map.
 */
export declare type Map = {
    [key: string]: Entry;
};
/**
 * Get a new entry with the given identity.
 * @param identity Entry identity.
 * @returns Returns the new entry.
 */
export declare const getNewEntry: (identity: number) => Entry;
