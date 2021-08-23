import type Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consume one unit that is in the range accepted by the pattern.
 */
export default class Range extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param begin Beginning of the boundary unit.
     * @param end End of the boundary unit.
     */
    constructor(begin: string | number, end: string | number);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source: Base): boolean;
}
