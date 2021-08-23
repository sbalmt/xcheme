import Base from '../../source/base';
import { Nodes } from '../../core/node';
import Pattern from '../pattern';
/**
 * Consume all the given patterns in this pattern and, in case of success,
 * it appends a new node in the source output node.
 */
export default class Append extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param value Node value.
     * @param output Output node destination.
     * @param current Child node destination.
     * @param head Append head pattern.
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
