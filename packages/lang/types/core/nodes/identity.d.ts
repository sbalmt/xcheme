import * as Core from '@xcheme/core';
import * as Basic from './basic';
/**
 * Identity node.
 */
export declare class Node extends Basic.Node {
    #private;
    /**
     * Default constructor.
     * @param node Original node.
     * @param identity Node identity.
     * @param dynamic Determines whether or not the node can have a dynamic identity.
     */
    constructor(node: Core.Node, identity: number, dynamic: boolean);
    /**
     * Get the node identity.
     */
    get identity(): number;
    /**
     * Get whether or not the node can have a dynamic identity.
     */
    get dynamic(): boolean;
}
