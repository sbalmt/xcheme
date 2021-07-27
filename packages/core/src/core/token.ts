import type Fragment from './fragment';

/**
 * A token product to compose the token list generated in the analysis process.
 */
export default class Token {
  /**
   * Token fragment.
   */
  #fragment: Fragment;

  /**
   * Token value.
   */
  #value: string | number;

  /**
   * Default constructor.
   * @param fragment Token fragment.
   * @param value Token value.
   */
  constructor(fragment: Fragment, value: string | number) {
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
  get value(): string | number {
    return this.#value;
  }
}
