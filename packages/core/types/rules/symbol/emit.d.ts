import Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consumes all the given patterns and, in case of success, it will emit a new symbol into the current symbol table.
 */
export default class Emit extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param value Symbol value.
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
