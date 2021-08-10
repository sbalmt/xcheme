/**
 * Context pointers set.
 */
export declare type Pointers = Set<string>;
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
     * Current identity.
     */
    identity: number;
    /**
     * Context pointers.
     */
    pointers: Pointers;
    /**
     * Current counter.
     */
    counter: number;
    /**
     * Context type.
     */
    type: Types;
};
