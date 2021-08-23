import type Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Doesn't consume anything and returns the static state given for this pattern.
 */
export default class Static extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param value Static value.
     */
    constructor(value: boolean);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns the static result.
     */
    consume(source: Base): boolean;
}
