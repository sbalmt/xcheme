import Base from '../route';
/**
 * Produce a route to consume units.
 */
export default class Route extends Base {
    /**
     * Default constructor.
     * @param first First route unit.
     * @param units Route units.
     */
    constructor(first: string | number, ...units: (string | number)[]);
}
