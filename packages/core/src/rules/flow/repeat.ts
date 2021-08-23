import type Base from '../../source/base';

import Pattern from '../pattern';
import Expect from './expect';
import Try from './try';

/**
 * Consume all the given patterns in this pattern and, in case of success, retry the consumption.
 */
export default class Repeat extends Pattern {
  /**
   * Target pattern.
   */
  #target: Pattern;

  /**
   * Triable pattern.
   */
  #triable: Pattern;

  /**
   * Default constructor.
   * @param patterns Sequence of patterns.
   */
  constructor(...patterns: Pattern[]) {
    super();
    this.#target = new Expect(...patterns);
    this.#triable = new Try(this.#target);
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base): boolean {
    if (this.#target.consume(source)) {
      while (this.#triable.consume(source));
      return true;
    }
    return false;
  }
}
