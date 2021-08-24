import * as Core from '@xcheme/core';
import { Symbols } from '../symbols';
/**
 * Directive pattern
 */
export default class Directive extends Core.Pattern {
    #private;
    /**
     * Default constructor.
     * @param symbol Symbol value.
     * @param identity Identity pattern.
     * @param expression Expression pattern.
     */
    constructor(symbol: Symbols, identity: Core.Pattern, expression: Core.Pattern);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source: Core.BaseSource): boolean;
}
