import type { Types } from '../../core/types';
import type { Source } from '../../sources';

import Pattern from '../pattern';
import Try from './try';

/**
 * Consume the first matching pattern in the list of patterns.
 */
export default class Choose<T extends Types> extends Pattern<T> {
  /**
   * List of target patterns.
   */
  #targets: Pattern<T>[];

  /**
   * Default constructor.
   * @param patterns List of patterns.
   */
  constructor(...patterns: Pattern<T>[]) {
    super();
    this.#targets = patterns.map((pattern) => new Try<T>(pattern));
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Source<T>): boolean {
    for (const target of this.#targets) {
      if (target.consume(source)) {
        return true;
      }
    }
    return false;
  }
}
