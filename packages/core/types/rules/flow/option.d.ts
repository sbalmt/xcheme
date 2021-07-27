import type Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consumes all the given patterns in this pattern without raising a consumption failure.
 */
export default class Option extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param patterns Sequence of patterns.
     */
    constructor(...patterns: Pattern[]);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true anyways.
     */
    consume(source: Base): boolean;
}
