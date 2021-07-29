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
     * Get the parent table.
     */
    get parent(): Table | undefined;
    /**
     * Get all record keys in this table.
     */
    get keys(): string[];
    /**
     * Get the number of entries in this table.
     */
    get length(): number;
    /**
     * Check whether or not there's a symbol record for the given key.
     * @param key Symbol record key.
     * @returns Returns true when the symbol record already exists, false otherwise.
     */
    hasRecord(key: Fragment | string): boolean;
    /**
     * Get the symbol record that corresponds to the specified key.
     * @param key Symbol record key.
     * @returns Returns the corresponding record or undefined when the record wasn't found.
     */
    getRecord(key: Fragment | string): Record | undefined;
    /**
     * Add a new symbol record into the symbol table.
     * @param record Symbol record.
     * @throw Throws an error when a symbol record with the same fragment data already exists.
     */
    addRecord(record: Record): void;
}
