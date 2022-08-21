import type Fragment from './data/fragment';
import type { Types, TokenType } from './types';

import { Data } from './collections/data';
import { List, ReadOnlyList } from './collections/list';

/**
 * Token element class.
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
}

/**
 * A token element for the token list generated in the analysis process.
 */
export class TokenList<T extends Types> extends List<Token<T>> {
  /**
   * Construct and add a new token for the given fragment and value.
   * @param fragment Token fragment.
   * @param value Token value.
   * @returns Returns the new token.
   */
  emplace(fragment: Fragment, value: number): Token<T> {
    const token = new Token(fragment, value);
    this.insert(token);
    return token;
  }
}

/**
 * Read-only token list class.
 */
export class ReadOnlyTokenList<T extends Types> extends ReadOnlyList<Token<T>> {}
