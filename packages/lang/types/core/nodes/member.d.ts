import * as Core from '@xcheme/core';
import * as Identity from './identity';
/**
 * Member entry.
 */
export declare type Entry = {
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
};
/**
 * Member node.
 */
export declare class Node extends Identity.Node {
    #private;
    /**
     * Default constructor.
     * @param node Original node.
     * @param entry Node entry.
     * @param route Route node.
     */
    constructor(node: Core.Node, entry: Entry, route: Core.Node);
    /**
     * Get whether or not the directive can have a dynamic identity.
     */
    get dynamic(): boolean;
    /**
     * Determines whether or not the member has a route.
     */
    get empty(): boolean;
    /**
     * Get the member route.
     */
    get route(): Core.Node;
}
