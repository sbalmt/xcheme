import * as Core from '@xcheme/core';
import * as Entries from '../core/entries';
/**
 * Context entry.
 */
declare type Entry = {
    /**
     * Entry origin.
     */
    origin: Entries.Origins;
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
     * Determines whether or not the entry has a dynamic identity.
     */
    dynamic: boolean;
};
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
 * Context consumption state.
 */
export declare type State = {
    /**
     * Context type.
     */
    type: Types;
    /**
     * Anchor node from the AST.
     */
    anchor: Core.Node;
    /**
     * Auto identity counter.
     */
    counter: number;
    /**
     * Current entry.
     */
    entry: Entry;
};
/**
 * Get a new state based on the given parameters.
 * @param anchor Anchor node.
 * @param counter Auto identity counter.
 * @returns Returns the new state.
 */
export declare const getNewState: (anchor: Core.Node, counter: number) => State;
export {};
