import Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consume all the given patterns and, in case of success, it will emit a new error into the current error list.
 */
export default class Emit extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param value Error value.
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
