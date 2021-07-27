import type Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consumes all the given patterns and negate the consumption result.
 */
export default class Negate extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param patterns Sequence of patterns.
     */
    constructor(...patterns: Pattern[]);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns the negated consumption result.
     */
    consume(source: Base): boolean;
}
