import type Base from '../../source/base';
import type Route from '../route';
import Pattern from '../pattern';
/**
 * Consume the first route that match in the list of routes given for this pattern.
 */
export default class Map extends Pattern {
    #private;
    /**
     * Default constructor.
     * @param routes List of routes.
     */
    constructor(...routes: Route[]);
    /**
     * Consume the given source.
     * @param source Data source.
     * @returns Returns true when the source was consumed, otherwise returns false.
     */
    consume(source: Base): boolean;
}
