import * as Core from '@xcheme/core';
/**
 * Prefixed unary expression pattern.
 */
export default class Unary extends Core.Pattern {
    #private;
    /**
     * Default constructor.
     * @param operator Unary operator.
     * @param expression Expression pattern.
     */
    constructor(operator: Core.Pattern, expression: Core.Pattern);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source: Core.BaseSource): boolean;
}
