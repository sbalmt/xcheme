import type Fragment from './data/fragment';

import { List, ReadOnlyList } from './collections/list';

/**
 * Default errors.
 */
export const enum Errors {
  DUPLICATE_IDENTIFIER = 0x1000
}

/**
 * An error element for the error list generated in the analysis process.
 */
export class Error {
  /**
   * Error fragment.
   */
  #fragment: Fragment;

  /**
   * Error value.
   */
  #value: number;

  /**
   * Default constructor.
   * @param fragment Error fragment.
   * @param value Error value.
   */
  constructor(fragment: Fragment, value: number) {
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
  get value(): number {
    return this.#value;
  }
}

/**
 * Error list class.
 */
export class ErrorList extends List<Error> {
  /**
   * Construct and add a new error for the given fragment and value.
   * @param fragment Error fragment.
   * @param value Error value.
   * @returns Returns the new error.
   */
  emplace(fragment: Fragment, value: number): Error {
    const error = new Error(fragment, value);
    this.insert(error);
    return error;
  }
}

/**
 * Read-only error list class.
 */
export class ReadOnlyErrorList extends ReadOnlyList<Error> {}
