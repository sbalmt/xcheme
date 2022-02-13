import type Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consume all the given patterns in this pattern as an optional behavior.
 */
export default class Opt extends Pattern {
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
