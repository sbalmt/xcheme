import Base from '../route';
import Pattern from '../pattern';
/**
 * Produce a route to consume units and in case of success it emits a new symbol record.
 */
export default class Route extends Base {
    /**
     * Default constructor.
     * @param value Symbol value.
     * @param test Symbol pattern.
     * @param first Route pattern or the first unit.
     * @param units Route units.
     */
    constructor(value: string | number, test: Pattern, first: Pattern | string | number, ...units: (string | number)[]);
}
