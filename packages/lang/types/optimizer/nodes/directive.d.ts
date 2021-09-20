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
     * @param dynamic Determines whether or not the directive can have a dynamic identity.
     * @param alias Determines whether or not the directive is an alias.
     */
    constructor(node: Core.Node, identity: number, dynamic: boolean, alias: boolean);
    /**
     * Get whether or not the directive is an alias.
     */
    get alias(): boolean;
    /**
     * Get the directive name.
     */
    get name(): string;
}
