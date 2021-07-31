import type Fragment from './fragment';

/**
 * All default errors.
 */
export const enum Errors {
  DUPLICATE_IDENTIFIER = -1
}

/**
 * An error product to compose the error list generated in the analysis process.
 */
export default class Error {
  /**
   * Error fragment.
   */
  #fragment: Fragment;

  /**
   * Error value.
   */
  #value: string | number;

  /**
   * Default constructor.
   * @param fragment Error fragment.
   * @param value Error value.
   */
  constructor(fragment: Fragment, value: string | number) {
    this.#fragment = fragment;
    this.#value = value;
  }

  /**
   * Get the error fragment.
   */
  get fragment(): Fragment {
    return this.#fragment;
  }

  /**
   * Get the error value.
   */
  get value(): string | number {
    return this.#value;
  }
}
