import type Base from '../../source/base';

import Pattern from '../pattern';
import Try from './try';

/**
 * Consumes all the given patterns and negate the consumption result.
 */
export default class Negate extends Pattern {
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
   * @returns Returns the negated consumption result.
   */
  consume(source: Base): boolean {
    if (source.length > 0) {
      return !this.#target.consume(source);
    }
    return false;
  }
}
