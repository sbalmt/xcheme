import Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consumes all the given patterns when the specified state value is defined.
 */
export default class Emit extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param value State value.
     * @param patterns Sequence of patterns.
     */
    constructor(value: number, ...patterns: Pattern[]);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source: Base): boolean;
}
