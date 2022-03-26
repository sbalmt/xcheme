import type Base from '../../source/base';

import Pattern from '../pattern';

/**
 * Consume all patterns that are expected by this pattern.
 */
export default class Expect<R extends object> extends Pattern<R> {
  /**
   * Target patterns.
   */
  #targets: Pattern<R>[];

  /**
   * Default constructor.
   * @param patterns Sequence of patterns.
   */
  constructor(...patterns: Pattern<R>[]) {
    super();
    this.#targets = patterns;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base<R>): boolean {
    for (const target of this.#targets) {
      if (!target.consume(source)) {
        return false;
      }
    }
    return true;
  }
}
