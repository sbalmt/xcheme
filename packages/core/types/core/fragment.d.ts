import type Location from './location';
/**
 * A data fragment with its precise location.
 */
export default class Fragment {
    #private;
    /**
     * Default constructor.
     * @param source Fragment source.
     * @param offset Fragment offset.
     * @param length Fragment length.
     * @param location Fragment location.
     */
    constructor(source: string, begin: number, end: number, location: Location);
    /**
     * Get the fragment source.
     */
    get source(): string;
    /**
     * Get the fragment data.
     */
    get data(): string;
    /**
     * Get the beginning of the fragment offset.
     */
    get begin(): number;
    /**
     * Get the end of the fragment offset.
     */
    get end(): number;
    /**
     * Get the fragment location in terms of lines and columns.
     */
    get location(): Location;
}
