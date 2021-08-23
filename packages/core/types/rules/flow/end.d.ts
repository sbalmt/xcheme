import type Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Doesn't consume anything, but it expects the end of the given data source.
 */
export default class End extends Pattern {
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was ended, otherwise returns false.
     */
    consume(source: Base): boolean;
}
