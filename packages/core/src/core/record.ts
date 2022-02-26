import type Fragment from './fragment';
import type Table from './table';
import type Node from './node';

/**
 * Internal data map.
 */
type DataMap = {
  [key: string]: any;
};

/**
 * A symbol record generated during the analysis process to be stored into the symbol table.
 */
export default class Record {
  /**
   * Record data map.
   */
  #data: DataMap = {};

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
  #node: Node | undefined;

  /**
   * Record table link.
   */
  #link: Table | undefined;

  /**
   * Default constructor.
   * @param fragment Record fragment.
   * @param value Record value.
   * @param node Record node.
   * @param link Record table link.
   */
  constructor(fragment: Fragment, value: string | number, node?: Node, link?: Table) {
    this.#fragment = fragment;
    this.#value = value;
    this.#node = node;
    this.#link = link;
  }

  /**
   * Get the record data map.
   */
  get data(): DataMap {
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
  get node(): Node | undefined {
    return this.#node;
  }

  /**
   * Get the record table link.
   */
  get link(): Table | undefined {
    return this.#link;
  }
}
