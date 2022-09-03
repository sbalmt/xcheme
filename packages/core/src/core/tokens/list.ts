import type { Fragment } from '../coordinates';
import type { Types } from '../types';

import { List } from '../collections';
import { Token } from './token';

/**
 * Token list class.
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
