import type Base from '../../source/base';

import Pattern from '../pattern';
import Try from './try';

/**
 * Consume the test pattern and, in case of success, it also consumes the success pattern.
 * Otherwise, it will consume the failure pattern (when specified).
 */
export default class Condition extends Pattern {
  /**
   * Test pattern.
   */
  #test: Pattern;

  /**
   * Success pattern.
   */
  #success: Pattern;

  /**
   * Failure pattern.
   */
  #failure?: Pattern;

  /**
   * Default constructor.
   * @param test Test pattern.
   * @param success Success pattern.
   * @param failure Failure pattern.
   */
  constructor(test: Pattern, success: Pattern, failure?: Pattern) {
    super();
    this.#test = new Try(test);
    this.#success = success;
    this.#failure = failure;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base): boolean {
    if (this.#test.consume(source)) {
      return this.#success.consume(source);
    } else if (this.#failure) {
      return this.#failure.consume(source);
    }
    return false;
  }
}
