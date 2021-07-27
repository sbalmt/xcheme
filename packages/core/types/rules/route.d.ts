import type Pattern from './pattern';
/**
 * Base of any route used together with routing patterns.
 */
export default class Route {
    #private;
    /**
     * Default constructor.
     * @param pattern Route pattern.
     * @param units Route units.
     */
    constructor(pattern: Pattern, ...units: (string | number)[]);
    /**
     * Get the route pattern.
     */
    get pattern(): Pattern;
    /**
     * Get the route units.
     */
    get units(): (string | number)[];
}
