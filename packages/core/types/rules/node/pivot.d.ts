import Base from '../../source/base';
import { Nodes } from '../../core/node';
import Pattern from '../pattern';
/**
 * Consume all the given patterns in this pattern and, in case of success,
 * it creates a new node in the source output and pivot current ones.
 */
export default class Pivot extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param value Node value.
     * @param output Output node destination.
     * @param current Current node destination.
     * @param head Pivot head pattern.
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
