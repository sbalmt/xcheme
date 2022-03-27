import type Fragment from './fragment';
import type Table from './table';
import type Node from './node';

import * as Metadata from './metadata';

/**
 * A symbol record generated during the analysis process to be stored into the symbol table.
 */
export default class Record<T extends Metadata.Types> extends Metadata.Container<Metadata.Record<T>> {
  /**
   * Record fragment.
   */
  #fragment: Fragment;

  /**
   * Record value.
   */
  #value: number;

  /**
   * Record node.
   */
  #node: Node<T> | undefined;

  /**
   * Record table link.
   */
  #link: Table<T> | undefined;

  /**
   * Default constructor.
   * @param fragment Record fragment.
   * @param value Record value.
   * @param node Record node.
   * @param link Record table link.
   */
  constructor(fragment: Fragment, value: number, node?: Node<T>, link?: Table<T>) {
    super();
    this.#fragment = fragment;
    this.#value = value;
    this.#node = node;
    this.#link = link;
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
   * Get the record table link.
   */
  get link(): Table<T> | undefined {
    return this.#link;
  }
}
