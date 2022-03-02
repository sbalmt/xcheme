import * as Core from '@xcheme/core';
import * as Basic from './basic';
/**
 * Identified node.
 */
export declare class Node extends Basic.Node {
    #private;
    /**
     * Default constructor.
     * @param node Original node.
     * @param identity Node identity.
     */
    constructor(node: Core.Node, identity: number);
    /**
     * Get the node identity.
     */
    get identity(): number;
}
