/**
 * Context pointers set.
 */
export declare type Pointers = Set<string>;
/**
 * Context Id counters.
 */
export declare type Counters = {
    /**
     * Token entries counter.
     */
    token: number;
    /**
     * Node entries counter.
     */
    node: number;
};
/**
 * Context types.
 */
export declare const enum Types {
    Skip = 0,
    Token = 1,
    Node = 2
}
/**
 * Store the consumption context state.
 */
export declare type State = {
    /**
     * Current Id.
     */
    id: number;
    /**
     * Context pointers.
     */
    pointers: Pointers;
    /**
     * Context Id counters.
     */
    counters: Counters;
    /**
     * Context type.
     */
    type: Types;
};
