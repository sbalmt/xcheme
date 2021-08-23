import type Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consume all the units that are expected by the pattern.
 */
export default class Expect extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param units List of expected units.
     */
    constructor(...units: (string | number)[]);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source: Base): boolean;
}
