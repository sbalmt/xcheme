import type Base from '../../source/base';

import Pattern from '../pattern';
import Try from './try';

/**
 * Consume all the given patterns and invert the consumption state.
 */
export default class Not extends Pattern {
  /**
   * Target pattern.
   */
  #target: Pattern;

  /**
   * Default constructor.
   * @param patterns Sequence of patterns.
   */
  constructor(...patterns: Pattern[]) {
    super();
    this.#target = new Try(...patterns);
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns the inverted consumption state.
   */
  consume(source: Base): boolean {
    if (source.length > 0) {
      return !this.#target.consume(source);
    }
    return false;
  }
}
