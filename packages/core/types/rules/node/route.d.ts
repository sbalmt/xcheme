import Base from '../route';
import Pattern from '../pattern';
import { Nodes } from '../../core/node';
/**
 * Produce a route to consume units and in case of success it emits a new node.
 */
export default class Route extends Base {
    /**
     * Default constructor.
     * @param value Node value.
     * @param output Output node destination.
     * @param first Route pattern or the first unit.
     * @param units Route units.
     */
    constructor(value: string | number, output: Nodes, first: Pattern | string | number, ...units: (string | number)[]);
}
