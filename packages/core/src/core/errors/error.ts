import type { Fragment } from '../coordinates';

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

  /**
   * Swap all contents of the given error.
   * @param error Error instance.
   */
  swap(error: Error): void {
    [this.#fragment, error.#fragment] = [error.#fragment, this.#fragment];
    [this.#value, error.#value] = [error.#value, this.#value];
  }
}
