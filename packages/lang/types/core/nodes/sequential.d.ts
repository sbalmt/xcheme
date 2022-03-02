import * as Core from '@xcheme/core';
import * as Parser from '../../parser';
import * as Basic from './basic';
/**
 * Sequential node.
 */
export declare class Node extends Basic.Node {
    #private;
    /**
     * Default constructor.
     * @param node Original node.
     * @param type Node sequence type.
     */
    constructor(node: Core.Node, type: Parser.Nodes);
    /**
     * Get the node sequence type.
     */
    get type(): Parser.Nodes;
    /**
     * Get the nodes sequence.
     */
    get sequence(): Core.Node[];
}
