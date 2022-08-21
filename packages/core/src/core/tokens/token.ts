import type { Types, TokenType } from '../types';
import type { Fragment } from '../coordinates';

import { Data } from '../collections/data';

/**
 * A token element for the token list generated in the analysis process.
 */
export class Token<T extends Types> extends Data<TokenType<T>> {
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

  /**
   * Swap all contents of the given token.
   * @param token Token instance.
   */
  swap(token: Token<T>): void {
    [this.#fragment, token.#fragment] = [token.#fragment, this.#fragment];
    [this.#value, token.#value] = [token.#value, this.#value];
  }
}
