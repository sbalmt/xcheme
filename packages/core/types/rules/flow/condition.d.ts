import type Base from '../../source/base';
import Pattern from '../pattern';
/**
 * Consumes the test pattern and, in case of success, it also consumes the success pattern,
 * otherwise, it will consume the failure pattern (when provided).
 */
export default class Condition extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param test Test pattern.
     * @param success Success pattern.
     * @param failure Failure pattern.
     */
    constructor(test: Pattern, success: Pattern, failure?: Pattern);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source: Base): boolean;
}
