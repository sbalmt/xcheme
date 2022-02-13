/**
 * A range class.
 */
export default class Range {
    #private;
    /**
     * Default constructor.
     * @param begin Range begin.
     * @param end Range end.
     */
    constructor(begin: number, end: number);
    /**
     * Get the range begin.
     */
    get begin(): number;
    /**
     * Get the range end.
     */
    get end(): number;
    /**
     * Get the range length.
     */
    get length(): number;
}
