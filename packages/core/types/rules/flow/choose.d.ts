import type Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consumes the first matching pattern in the list of patterns.
 */
export default class Choose extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param patterns List of patterns.
     */
    constructor(...patterns: Pattern[]);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source: Base): boolean;
}
