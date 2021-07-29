import type Base from '../../source/base';
import type { Nodes } from '../../core/node';
import Pattern from '../pattern';
/**
 * Consumes all the given patterns and, in case of success,
 * it appends the resulting node into the current source output node.
 */
export default class Scope extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param current Child destination in the current node.
     * @param patterns Sequence of patterns.
     */
    constructor(current: Nodes, ...patterns: Pattern[]);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source: Base): boolean;
}
