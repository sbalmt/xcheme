import type Fragment from './fragment';
import type Table from './table';
import type Node from './node';

/**
 * A symbol record generated during the analysis process to be stored into the symbol table.
 */
export default class Record<R extends object> {
  /**
   * Record metadata.
   */
  #data: R | undefined;

  /**
   * Record fragment.
   */
  #fragment: Fragment;

  /**
   * Record value.
   */
  #value: string | number;

  /**
   * Record node.
   */
  #node: Node<R> | undefined;

  /**
   * Record table link.
   */
  #link: Table<R> | undefined;

  /**
   * Default constructor.
   * @param fragment Record fragment.
   * @param value Record value.
   * @param node Record node.
   * @param link Record table link.
   */
  constructor(fragment: Fragment, value: string | number, node?: Node<R>, link?: Table<R>) {
    this.#fragment = fragment;
    this.#value = value;
    this.#node = node;
    this.#link = link;
  }

  /**
   * Get whether or not the record is enriched.
   */
  get enriched(): boolean {
    return !!this.#data;
  }

  /**
   * Get the record metadata.
   */
  get data(): R {
    if (!this.#data) {
      throw `Record '${this.fragment.data}' isn't enriched.`;
    }
    return this.#data;
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
  get value() {
    return this.#value;
  }

  /**
   * Get the record node.
   */
  get node(): Node<R> | undefined {
    return this.#node;
  }

  /**
   * Get the record table link.
   */
  get link(): Table<R> | undefined {
    return this.#link;
  }

  /**
   * Initialize the record metadata.
   * @param data Record metadata.
   * @throws Throws an exception when the record is already enriched.
   */
  enrich(data: R): void {
    if (this.#data) {
      throw `Record '${this.fragment.data}' is already enriched.`;
    }
    this.#data = data;
  }
}
