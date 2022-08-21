import type { Types } from '../../core/types';
import type Base from '../../source/base';

import Pattern from '../pattern';

/**
 * Consume all patterns that are expected by this pattern.
 */
export default class Expect<T extends Types> extends Pattern<T> {
  /**
   * Target patterns.
   */
  #targets: Pattern<T>[];

  /**
   * Default constructor.
   * @param patterns Sequence of patterns.
   */
  constructor(...patterns: Pattern<T>[]) {
    super();
    this.#targets = patterns;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base<T>): boolean {
    for (const target of this.#targets) {
      if (!target.consume(source)) {
        return false;
      }
    }
    return true;
  }
}
