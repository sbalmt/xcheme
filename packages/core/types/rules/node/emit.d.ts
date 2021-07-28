import Base from '../../source/base';
import { Nodes } from '../../core/node';
import Pattern from '../pattern';
/**
 * Consumes all the given patterns and, in case of success, it will emit a new node as the next child of the current node.
 * Any working node in the current source output will be attached as the left child from the new node.
 */
export default class Emit extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param value Token value.
     * @param output Output node destination.
     * @param patterns Sequence of patterns.
     */
    constructor(value: string | number, output: Nodes, ...patterns: Pattern[]);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     * @throws Throws an error when there's no node to emit.
     */
    consume(source: Base): boolean;
}
