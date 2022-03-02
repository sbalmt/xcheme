import * as Core from '@xcheme/core';
import * as Identity from './identity';
/**
 * Member node.
 */
export declare class Node extends Identity.Node {
    #private;
    /**
     * Default constructor.
     * @param node Original node.
     * @param record Symbol record.
     * @param route Route node.
     */
    constructor(node: Core.Node, record: Core.Record, route: Core.Node);
    /**
     * Determines whether or not the member has a route.
     */
    get empty(): boolean;
    /**
     * Get whether or not the member is dynamic.
     */
    get dynamic(): boolean;
    /**
     * Get the member route.
     */
    get route(): Core.Node;
}
