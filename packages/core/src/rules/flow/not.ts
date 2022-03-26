import type Base from '../../source/base';

import Pattern from '../pattern';
import Try from './try';

/**
 * Consume all the given patterns and invert the consumption state.
 */
export default class Not<R extends object> extends Pattern<R> {
  /**
   * Target pattern.
   */
  #target: Pattern<R>;

  /**
   * Default constructor.
   * @param patterns Sequence of patterns.
   */
  constructor(...patterns: Pattern<R>[]) {
    super();
    this.#target = new Try<R>(...patterns);
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns the inverted consumption state.
   */
  consume(source: Base<R>): boolean {
    if (source.length > 0) {
      return !this.#target.consume(source);
    }
    return false;
  }
}
