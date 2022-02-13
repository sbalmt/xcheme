import Base from '../route';
import Pattern from '../pattern';
/**
 * Produce a route to consume all the given patterns with the uncase transformation.
 */
export default class Route extends Base {
    /**
     * Default constructor.
     * @param pattern Route pattern.
     * @param first First route unit.
     * @param units Route units.
     */
    constructor(pattern: Pattern, first: string | number, ...units: (string | number)[]);
}
