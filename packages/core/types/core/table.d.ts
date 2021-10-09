import Fragment from './fragment';
import Record from './record';
/**
 * A symbol table for storing symbol records generated during the analysis process.
 */
export default class Table {
    #private;
    /**
     * Default constructor.
     * @param parent Parent table.
     */
    constructor(parent?: Table);
    /**
     * Get all the record names in the table.
     */
    get names(): string[];
    /**
     * Get the number of entries in the table.
     */
    get length(): number;
    /**
     * Get the parent table.
     */
    get parent(): Table | undefined;
    /**
     * Check whether or not there's a symbol record for the given name.
     * @param name Symbol record name.
     * @returns Returns true when the symbol record already exists, false otherwise.
     */
    has(name: Fragment | string): boolean;
    /**
     * Get the symbol record that corresponds to the specified name.
     * @param name Symbol record name.
     * @returns Returns the corresponding record or undefined when the record wasn't found.
     */
    get(name: Fragment | string): Record | undefined;
    /**
     * Add a new symbol record into the symbol table.
     * @param record Symbol record.
     * @throw Throws an error when a symbol record with the same fragment data already exists.
     */
    add(record: Record): void;
    /**
     * Find in all tables the symbol record that corresponds to the specified name.
     * @param name Symbol record name.
     * @returns Returns the corresponding record or undefined when the record wasn't found.
     */
    find(name: Fragment | string): Record | undefined;
    /**
     * Iterable generator.
     */
    [Symbol.iterator](): Generator<Record, void, unknown>;
}
