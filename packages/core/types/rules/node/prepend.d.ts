import Base from '../../source/base';
import { Nodes } from '../../core/node';
import Pattern from '../pattern';
/**
 * Consume all the given patterns in this pattern and, in case of success,
 * it prepends a new node in the source output node.
 */
export default class Prepend extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param value Node value.
     * @param output Output node destination.
     * @param current Current node destination.
     * @param head Prepend head pattern.
     * @param patterns Sequence of patterns.
     */
    constructor(value: string | number, output: Nodes, current: Nodes, head: Pattern, ...patterns: Pattern[]);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source: Base): boolean;
}
