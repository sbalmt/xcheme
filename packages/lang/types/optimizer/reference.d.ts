/**
 * Reference types.
 */
export declare const enum Types {
    User = 0,
    Loose = 1
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
};
/**
 * Reference Map.
 */
export declare type Map = {
    [key: string]: Entry;
};
