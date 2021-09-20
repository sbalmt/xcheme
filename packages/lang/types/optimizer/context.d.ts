import * as Core from '@xcheme/core';
import * as Reference from './reference';
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
     * Determines whether or not the context is an alias.
     */
    alias: boolean;
    /**
     * Reference entry.
     */
    entry: Reference.Entry;
    /**
     * All references.
     */
    references: Reference.Map;
    /**
     * Identity counter.
     */
    counter: number;
};
/**
 * Get a new state based on the given parameters.
 * @param anchor Anchor node.
 * @param references References map.
 * @param counter Auto identity counter.
 * @returns Returns the new state.
 */
export declare const getNewState: (anchor: Core.Node, references: Reference.Map, counter: number) => State;
