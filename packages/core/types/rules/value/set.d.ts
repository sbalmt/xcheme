import Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consumes all the given patterns and, in case of success, it will change the current output value.
 */
export default class Set extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param value New value.
     * @param patterns Sequence of patterns.
     */
    constructor(value: string | number, ...patterns: Pattern[]);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source: Base): boolean;
}
