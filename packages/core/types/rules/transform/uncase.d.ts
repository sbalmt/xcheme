import Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consumes all the given patterns with the uncase transformation.
 */
export default class Uncase extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param patterns Sequence of patterns.
     */
    constructor(...patterns: Pattern[]);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source: Base): boolean;
    /**
     * Transform the given unit according to the current state.
     * @param unit Input unit.
     * @returns Returns the unit transformation.
     */
    static transform(unit: string | number): string | number;
    /**
     * Determines whether or not the uncase is active.
     */
    static get active(): boolean;
}
