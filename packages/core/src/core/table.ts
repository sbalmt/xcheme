import type * as Metadata from './metadata';

import Fragment from './fragment';
import Record from './record';

/**
 * Internal record map.
 */
type RecordMap<T extends Metadata.Types> = {
  [name: string]: Record<T>;
};

/**
 * A symbol table for storing symbol records generated during the analysis process.
 */
export default class Table<T extends Metadata.Types> {
  /**
   * Map of records.
   */
  #records: RecordMap<T> = {};

  /**
   * Table length.
   */
  #length = 0;

  /**
   * Parent table.
   */
  #parent: Table<T> | undefined;

  /**
   * Default constructor.
   * @param parent Parent table.
   */
  constructor(parent?: Table<T>) {
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
  get parent(): Table<T> | undefined {
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
  get(name: Fragment | string): Record<T> | undefined {
    return this.#records[name instanceof Fragment ? name.data : name];
  }

  /**
   * Add a new symbol record into the symbol table.
   * @param record Symbol record.
   * @throw Throws an error when a symbol record with the same name (fragment data) already exists.
   * @returns Returns the given symbol record.
   */
  add(record: Record<T>): Record<T> {
    const name = record.fragment.data;
    if (this.#records[name]) {
      throw 'Unable to add records with duplicate name.';
    }
    this.#records[name] = record;
    this.#length++;
    return record;
  }

  /**
   * Find for a symbol record that corresponds to the specified name in all symbol tables.
   * @param name Symbol record name.
   * @returns Returns the corresponding record or undefined when the record wasn't found.
   */
  find(name: Fragment | string): Record<T> | undefined {
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
