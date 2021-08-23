import type Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consume one unit that is between all the acceptable units in the pattern.
 */
export default class Choose extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param units List of acceptable units.
     */
    constructor(...units: (string | number)[]);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source: Base): boolean;
}
