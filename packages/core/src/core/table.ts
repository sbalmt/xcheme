import type * as Metadata from './metadata';

import Exception from './exception';

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
   * Get all record names in the table.
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
   * Check whether or not there's a record for the given name.
   * @param name Symbol record name.
   * @returns Returns true when the record already exists, false otherwise.
   */
  has(name: Fragment | string): boolean {
    return this.get(name) !== void 0;
  }

  /**
   * Get the record that corresponds to the specified name.
   * @param name Record name.
   * @returns Returns the corresponding record or undefined when the record wasn't found.
   */
  get(name: Fragment | string): Record<T> | undefined {
    return this.#records[name instanceof Fragment ? name.data : name];
  }

  /**
   * Add a new record into the table.
   * @param record Symbol record.
   * @throw Throws an error when a record with the same name (fragment data) already exists.
   * @returns Returns the given record.
   */
  add(record: Record<T>): Record<T> {
    const name = record.fragment.data;
    if (this.#records[name]) {
      throw new Exception(`Unable to add records with duplicate name.`);
    }
    this.#records[name] = record;
    this.#length++;
    return record;
  }

  /**
   * Find for a record that corresponds to the specified name in the current and all parent tables.
   * @param name Record name.
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
   * Add all records from the given table into the table.
   * @param table Another table.
   */
  assign(table: Table<T>): void {
    for (const record of table) {
      this.add(record);
      if (record.link) {
        record.link.#parent = this;
      }
    }
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
