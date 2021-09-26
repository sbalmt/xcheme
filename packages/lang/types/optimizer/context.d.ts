import * as Core from '@xcheme/core';
import * as Entries from '../core/entries';
/**
 * Context types.
 */
export declare const enum Types {
    Undefined = 0,
    Skip = 1,
    Token = 2,
    Node = 3
}
/**
 * Store the consumption state for the context.
 */
export declare type State = {
    /**
     * Context type.
     */
    type: Types;
    /**
     * Anchor node.
     */
    anchor: Core.Node;
    /**
     * Identity counter.
     */
    counter: number;
    /**
     * Current entry.
     */
    entry: Entries.Entry;
};
/**
 * Get a new state based on the given parameters.
 * @param anchor Anchor node.
 * @param counter Auto identity counter.
 * @returns Returns the new state.
 */
export declare const getNewState: (anchor: Core.Node, counter: number) => State;
