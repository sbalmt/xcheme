import type { Types, RecordType } from '../types';
import type { Fragment } from '../coordinates';
import type { Node } from '../nodes';
import type { SymbolTable } from './table';

import { Data } from '../collections/data';

/**
 * A symbol record generated in the analysis process to be stored into the symbol table.
 */
export class SymbolRecord<T extends Types> extends Data<RecordType<T>> {
  /**
   * Record fragment.
   */
  #fragment: Fragment;

  /**
   * Record node.
   */
  #node: Node<T> | undefined;

  /**
   * Linked symbol table.
   */
  #table: SymbolTable<T> | undefined;

  /**
   * Record value.
   */
  #value: number;

  /**
   * Default constructor.
   * @param fragment Record fragment.
   * @param value Record value.
   * @param node Record node.
   * @param table Linked symbol table.
   */
  constructor(fragment: Fragment, value: number, node?: Node<T>, table?: SymbolTable<T>) {
    super();
    this.#fragment = fragment;
    this.#value = value;
    this.#node = node;
    this.#table = table;
  }

  /**
   * Get the record fragment.
   */
  get fragment(): Fragment {
    return this.#fragment;
  }

  /**
   * Get the record value.
   */
  get value(): number {
    return this.#value;
  }

  /**
   * Get the record node.
   */
  get node(): Node<T> | undefined {
    return this.#node;
  }

  /**
   * Get the linked symbol table.
   */
  get table(): SymbolTable<T> | undefined {
    return this.#table;
  }

  /**
   * Get a shallow copy of the record.
   * @returns Returns the generated record.
   */
  clone(): SymbolRecord<T> {
    const result = new SymbolRecord(this.#fragment, this.#value, this.#node, this.#table);
    if (this.assigned) {
      result.assign(this.data);
    }
    return result;
  }

  /**
   * Swap all contents of the given record.
   * @param record Symbol record instance.
   */
  swap(record: SymbolRecord<T>): void {
    super.swap(record);
    [this.#fragment, record.#fragment] = [record.#fragment, this.#fragment];
    [this.#value, record.#value] = [record.#value, this.#value];
    [this.#node, record.#node] = [record.#node, this.#node];
    [this.#table, record.#table] = [record.#table, this.#table];
  }
}
