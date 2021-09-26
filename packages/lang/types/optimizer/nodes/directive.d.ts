import * as Core from '@xcheme/core';
import * as Identity from './identity';
import * as Entries from '../../core/entries';
/**
 * Directive node.
 */
export declare class Node extends Identity.Node {
    #private;
    /**
     * Default constructor.
     * @param node Original node.
     * @param entry Node entry.
     */
    constructor(node: Core.Node, entry: Entries.Entry);
    /**
     * Get whether or not the directive is an alias.
     */
    get alias(): boolean;
    /**
     * Get the directive identifier.
     */
    get identifier(): string;
}
