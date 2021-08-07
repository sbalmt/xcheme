import * as Core from '@xcheme/core';
/**
 * Binary expression pattern.
 */
export default class Binary extends Core.Pattern {
    #private;
    /**
     * Default constructor.
     * @param operator Binary operator.
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
