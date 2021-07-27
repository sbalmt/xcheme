import type Base from '../source/base';
/**
 * Base of any pattern class.
 */
export default abstract class Pattern {
    /**
     * Should be implemented to consume the given source.
     * @param source Should receive the data source.
     * @returns Should returns true when the data source was consumed, otherwise should return false.
     */
    consume(source: Base): boolean;
}
