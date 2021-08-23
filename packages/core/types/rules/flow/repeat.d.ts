import type Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consume all the given patterns in this pattern and, in case of success, retry the consumption.
 */
export default class Repeat extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param patterns Sequence of patterns.
     */
    constructor(...patterns: Pattern[]);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source: Base): boolean;
}
