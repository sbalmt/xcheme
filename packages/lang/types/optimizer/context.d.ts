import * as Core from '@xcheme/core';
import * as Project from '../core/project';
import * as Entries from '../core/entries';
/**
 * Context entry.
 */
declare type Entry = {
    /**
     * Entry types.
     */
    type: Entries.Types;
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
    /**
     * Determines whether or not the entry can be exported.
     */
    exported: boolean;
};
/**
 * Context consumption state.
 */
export declare type State = {
    /**
     * Anchor node from the AST.
     */
    anchor: Core.Node;
    /**
     * Current entry.
     */
    entry: Entry;
};
/**
 * Get a new state entry based on the given entry model.
 * @param model Entry model.
 * @returns Returns the generated entry.
 */
export declare const getNewStateEntry: (model: Partial<Entry>) => Entry;
/**
 * Get a new state based on the given parameters.
 * @param anchor Anchor node.
 * @param identity Entry identity.
 * @returns Returns the new state.
 */
export declare const getNewState: (anchor: Core.Node, identity: number) => State;
export declare const getCount: (project: Project.Context) => number;
export {};
