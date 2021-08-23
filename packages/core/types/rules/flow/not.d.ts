import type Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consume all the given patterns and invert the consumption state.
 */
export default class Not extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param patterns Sequence of patterns.
     */
    constructor(...patterns: Pattern[]);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns the inverted consumption state.
     */
    consume(source: Base): boolean;
}
