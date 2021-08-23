import type Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consume one unit.
 */
export default class Any extends Pattern {
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source: Base): boolean;
}
