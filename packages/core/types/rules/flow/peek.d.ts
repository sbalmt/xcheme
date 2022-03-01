import type Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consume all the given patterns and always preserve the current source state.
 */
export default class Peek extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param pattern Sequence of patterns.
     */
    constructor(...patterns: Pattern[]);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source: Base): boolean;
}
