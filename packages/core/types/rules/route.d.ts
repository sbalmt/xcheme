import type Pattern from './pattern';
/**
 * Base of any route for using together with map patterns.
 */
export default class Route {
    #private;
    /**
     * Default constructor.
     * @param pattern Route pattern.
     * @param first First route unit.
     * @param units Remaining route units.
     */
    constructor(pattern: Pattern | null, first: string | number, ...units: (string | number)[]);
    /**
     * Get the route pattern.
     */
    get pattern(): Pattern | null;
    /**
     * Get the route units.
     */
    get units(): (string | number)[];
}
