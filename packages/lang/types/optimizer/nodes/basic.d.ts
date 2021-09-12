import * as Core from '@xcheme/core';
import * as Parser from '../../parser';
/**
 * Basic node.
 */
export declare class Node extends Core.Node {
    /**
     * Default constructor.
     * @param node Original node.
     */
    constructor(node: Core.Node);
    /**
     * Get the node value.
     */
    get value(): Parser.Nodes;
}
