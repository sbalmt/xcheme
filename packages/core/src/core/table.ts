import Fragment from './fragment';
import Record from './record';

/**
 * Internal record map.
 */
type Records = {
  [name: string]: Record;
};

/**
 * A symbol table for storing symbol records generated during the analysis process.
 */
export default class Table {
  /**
   * Table of records.
   */
  #records: Records = {};

  /**
   * Table length.
   */
  #length = 0;

  /**
   * Parent table.
   */
  #parent: Table | undefined;

  /**
   * Default constructor.
   * @param parent Parent table.
   */
  constructor(parent?: Table) {
    this.#parent = parent;
  }

  /**
   * Get the parent table.
   */
  get parent(): Table | undefined {
    return this.#parent;
  }

  /**
   * Get all record keys in this table.
   */
  get keys(): string[] {
    return Object.keys(this.#records);
  }

  /**
   * Get the number of entries in this table.
   */
  get length(): number {
    return this.#length;
  }

  /**
   * Get the symbol record that corresponds to the specified key.
   * @param key Symbol record key.
   * @returns Returns the corresponding record or undefined when the record wasn't found.
   */
  getRecord(key: Fragment | string): Record | undefined {
    return this.#records[key instanceof Fragment ? key.data : key];
  }

  /**
   * Add a new symbol record into the symbol table.
   * @param record Symbol record.
   * @throw Throws an error when a symbol record with the same fragment data already exists.
   */
  addRecord(record: Record): void {
    const key = record.fragment.data;
    if (this.#records[key]) {
      throw 'Unable to add records with duplicate fragment data.';
    }
    this.#records[key] = record;
    this.#length++;
  }
}
