import type Base from '../../source/base';

import Pattern from '../pattern';
import Try from './try';

/**
 * Consume the first matching pattern in the list of patterns.
 */
export default class Choose extends Pattern {
  /**
   * List of target patterns.
   */
  #targets: Pattern[];

  /**
   * Default constructor.
   * @param patterns List of patterns.
   */
  constructor(...patterns: Pattern[]) {
    super();
    this.#targets = patterns.map((pattern) => new Try(pattern));
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base): boolean {
    for (const target of this.#targets) {
      if (target.consume(source)) {
        return true;
      }
    }
    return false;
  }
}
