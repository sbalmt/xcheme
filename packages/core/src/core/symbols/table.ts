import { Fragment } from '../coordinates';
import { Exception } from '../exception';
import { Types } from '../types';
import { SymbolRecord } from './record';

/**
 * Internal record map.
 */
type RecordMap<T extends Types> = {
  [name: string]: SymbolRecord<T>;
};

/**
 * A symbol table for storing symbol records generated during the analysis process.
 */
export class SymbolTable<T extends Types> implements Iterable<SymbolRecord<T>> {
  /**
   * Map of records.
   */
  #records: RecordMap<T> = {};

  /**
   * Parent table.
   */
  #parent: SymbolTable<T> | undefined;

  /**
   * Table length.
   */
  #length = 0;

  /**
   * Default constructor.
   * @param parent Parent table.
   */
  constructor(parent?: SymbolTable<T>) {
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
  get parent(): SymbolTable<T> | undefined {
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
  get(name: Fragment | string): SymbolRecord<T> | undefined {
    return this.#records[name instanceof Fragment ? name.data : name];
  }

  /**
   * Insert a new record into the table.
   * @param record Symbol record.
   * @throw Throws an error when a record with the same name (fragment data) already exists.
   * @returns Returns the given record.
   */
  insert(record: SymbolRecord<T>): SymbolRecord<T> {
    const name = record.fragment.data;
    if (this.#records[name]) {
      throw new Exception(`Unable to add records with duplicate name.`);
    }
    this.#records[name] = record;
    this.#length++;
    return record;
  }

  /**
   * Find for a record that corresponds to the specified name in the current or any parent table.
   * @param name Record name.
   * @returns Returns the corresponding record or undefined when the record wasn't found.
   */
  find(name: Fragment | string): SymbolRecord<T> | undefined {
    const record = this.get(name);
    if (!record && this.#parent) {
      return this.#parent.find(name);
    }
    return record;
  }

  /**
   * Add all records from the given table into this table.
   * @param table Another table.
   */
  assign(table: SymbolTable<T>): void {
    for (const record of table) {
      this.insert(record);
      if (record.table) {
        record.table.#parent = this;
      }
    }
  }

  /**
   * Get a shallow copy of the table.
   * @returns Returns the generated table.
   */
  clone(): SymbolTable<T> {
    const result = new SymbolTable(this.#parent);
    result.#records = this.#records;
    result.#parent = this.#parent;
    result.#length = this.#length;
    return result;
  }

  /**
   * Swap all contents of the given table.
   * @param table Symbol table instance.
   */
  swap(table: SymbolTable<T>): void {
    [this.#records, table.#records] = [table.#records, this.#records];
    [this.#parent, table.#parent] = [table.#parent, this.#parent];
    [this.#length, table.#length] = [table.#length, this.#length];
  }

  /**
   * Iterable generator.
   */
  *[Symbol.iterator](): Iterator<SymbolRecord<T>> {
    for (const name in this.#records) {
      yield this.#records[name];
    }
  }
}
