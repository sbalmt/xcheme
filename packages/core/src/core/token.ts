import type Fragment from './fragment';

import * as Metadata from './metadata';

/**
 * A token product to compose the token list generated in the analysis process.
 */
export default class Token<T extends Metadata.Types> extends Metadata.Container<Metadata.Token<T>> {
  /**
   * Token fragment.
   */
  #fragment: Fragment;

  /**
   * Token value.
   */
  #value: number;

  /**
   * Default constructor.
   * @param fragment Token fragment.
   * @param value Token value.
   */
  constructor(fragment: Fragment, value: number) {
    super();
    this.#fragment = fragment;
    this.#value = value;
  }

  /**
   * Get the token fragment.
   */
  get fragment(): Fragment {
    return this.#fragment;
  }

  /**
   * Get the token value.
   */
  get value(): number {
    return this.#value;
  }
}
