import type Fragment from './fragment';
import type Node from './node';

/**
 * A symbol record generated during the analysis process to be stored in the symbol table.
 */
export default class Record {
  /**
   * Record fragment.
   */
  #fragment: Fragment;

  /**
   * Record node.
   */
  #node: Node | undefined;

  /**
   * Record value.
   */
  #value: string | number;

  /**
   * Default constructor.
   * @param fragment Record fragment.
   * @param node Record node.
   * @param value Record value.
   */
  constructor(fragment: Fragment, node: Node | undefined, value: string | number) {
    this.#fragment = fragment;
    this.#node = node;
    this.#value = value;
  }

  /**
   * Get the record fragment.
   */
  get fragment(): Fragment {
    return this.#fragment;
  }

  /**
   * Get the record node.
   */
  get node(): Node | undefined {
    return this.#node;
  }

  /**
   * Get the record value.
   */
  get value() {
    return this.#value;
  }
}
