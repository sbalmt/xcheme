import Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consumes all the given patterns and, in case of success, it will set a new state value.
 */
export default class Set extends Pattern {
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
