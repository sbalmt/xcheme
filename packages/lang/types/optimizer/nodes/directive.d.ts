import * as Core from '@xcheme/core';
import * as Identity from './identity';
/**
 * Directive node.
 */
export declare class Node extends Identity.Node {
    #private;
    /**
     * Default constructor.
     * @param node Original node.
     * @param identity Node identity.
     * @param alias Determines whether or not the directive is an alias.
     */
    constructor(node: Core.Node, identity: number, alias: boolean);
    /**
     * Get whether or not the node is an alias.
     */
    get alias(): boolean;
    /**
     * Get the node name.
     */
    get name(): string;
}
