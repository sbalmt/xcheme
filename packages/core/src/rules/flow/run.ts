import type { Types } from '../../core/types';
import type { Source } from '../../sources';

import Pattern from '../pattern';

/**
 * Consume the pattern object returned by the callback given for this pattern.
 */
export default class Run<T extends Types> extends Pattern<T> {
  /**
   * Callback for the pattern.
   */
  #callback: () => Pattern<T>;

  /**
   * Default constructor.
   * @param callback Callback for the pattern.
   */
  constructor(callback: () => Pattern<T>) {
    super();
    this.#callback = callback;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Source<T>): boolean {
    return this.#callback().consume(source);
  }
}
