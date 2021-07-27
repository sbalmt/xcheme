import type Base from '../../source/base';

import Pattern from '../pattern';

/**
 * Consumes all patterns that are expected by this pattern.
 */
export default class Expect extends Pattern {
  /**
   * Target patterns.
   */
  #targets: Pattern[];

  /**
   * Default constructor.
   * @param patterns Sequence of patterns.
   */
  constructor(...patterns: Pattern[]) {
    super();
    this.#targets = patterns;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base): boolean {
    for (const target of this.#targets) {
      if (!target.consume(source)) {
        return false;
      }
    }
    return true;
  }
}
