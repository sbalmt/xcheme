import * as Core from '@xcheme/core';
import * as Entries from '../entries';
import * as Identity from './identity';
/**
 * Directive types.
 */
export declare const enum Types {
    Skip = 0,
    Token = 1,
    Node = 2
}
/**
 * Directive node.
 */
export declare class Node extends Identity.Node {
    #private;
    /**
     * Default constructor.
     * @param node Original node.
     * @param type Directive type.
     * @param entry Node entry.
     */
    constructor(node: Core.Node, type: Types, entry: Entries.Entry);
    /**
     * Get the directive type.
     */
    get type(): Types;
    /**
     * Get whether or not the directive is an alias.
     */
    get alias(): boolean;
    /**
     * Get the directive identifier.
     */
    get identifier(): string;
}
