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
   * Get all the record names in the table.
   */
  get names(): string[] {
    return Object.keys(this.#records);
  }

  /**
   * Get the number of entries in the table.
   */
  get length(): number {
    return this.#length;
  }

  /**
   * Get the parent table.
   */
  get parent(): Table | undefined {
    return this.#parent;
  }

  /**
   * Check whether or not there's a symbol record for the given name.
   * @param name Symbol record name.
   * @returns Returns true when the symbol record already exists, false otherwise.
   */
  has(name: Fragment | string): boolean {
    return this.get(name) !== void 0;
  }

  /**
   * Get the symbol record that corresponds to the specified name.
   * @param name Symbol record name.
   * @returns Returns the corresponding record or undefined when the record wasn't found.
   */
  get(name: Fragment | string): Record | undefined {
    return this.#records[name instanceof Fragment ? name.data : name];
  }

  /**
   * Add a new symbol record into the symbol table.
   * @param record Symbol record.
   * @throw Throws an error when a symbol record with the same fragment data already exists.
   */
  add(record: Record): void {
    const name = record.fragment.data;
    if (this.#records[name]) {
      throw 'Unable to add records with duplicate fragment data.';
    }
    this.#records[name] = record;
    this.#length++;
  }

  /**
   * Find in all tables the symbol record that corresponds to the specified name.
   * @param name Symbol record name.
   * @returns Returns the corresponding record or undefined when the record wasn't found.
   */
  find(name: Fragment | string): Record | undefined {
    const record = this.get(name);
    if (!record && this.#parent) {
      return this.#parent.find(name);
    }
    return record;
  }

  /**
   * Iterable generator.
   */
  *[Symbol.iterator]() {
    for (const name in this.#records) {
      yield this.#records[name];
    }
  }
}
