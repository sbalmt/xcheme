import * as Core from '@xcheme/core';
import * as Symbols from '../symbols';
import * as Identified from './identified';
/**
 * Directive node.
 */
export declare class Node extends Identified.Node {
    #private;
    /**
     * Default constructor.
     * @param node Original node.
     * @param record Symbol record.
     */
    constructor(node: Core.Node, record: Core.Record);
    /**
     * Get the directive identifier.
     */
    get identifier(): string;
    /**
     * Get the directive type.
     */
    get type(): Symbols.Types;
    /**
     * Get whether or not the directive is an alias.
     */
    get alias(): boolean;
}
