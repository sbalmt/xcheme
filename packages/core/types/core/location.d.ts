/**
 * A fragment location in terms of lines and columns.
 */
export default class Location {
    #private;
    /**
     * Default constructor.
     * @param name Location name.
     * @param line Location line.
     * @param column Location column.
     */
    constructor(name: string, line: number, column: number);
    /**
     * Get the location name.
     */
    get name(): string;
    /**
     * Get the location line.
     */
    get line(): number;
    /**
     * Get the location column.
     */
    get column(): number;
}
