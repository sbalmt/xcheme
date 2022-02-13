import Range from './range';
/**
 * A location class.
 */
export default class Location {
    #private;
    /**
     * Default constructor.
     * @param name Location name.
     * @param line Line range.
     * @param column Column range.
     */
    constructor(name: string, line: Range, column: Range);
    /**
     * Get the location name.
     */
    get name(): string;
    /**
     * Get the line range.
     */
    get line(): Range;
    /**
     * Get the column range.
     */
    get column(): Range;
}
