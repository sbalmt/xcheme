import type Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consume the pattern object returned by the callback given for this pattern.
 */
export default class Run extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param callback Callback for the pattern.
     */
    constructor(callback: () => Pattern);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source: Base): boolean;
}
