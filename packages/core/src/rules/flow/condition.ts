import type Base from '../../source/base';

import Pattern from '../pattern';
import Try from './try';

/**
 * Consume the test pattern and, in case of success, it also consumes the success pattern.
 * Otherwise, it will consume the failure pattern (when specified).
 */
export default class Condition<R extends object> extends Pattern<R> {
  /**
   * Test pattern.
   */
  #test: Pattern<R>;

  /**
   * Success pattern.
   */
  #success: Pattern<R>;

  /**
   * Failure pattern.
   */
  #failure?: Pattern<R>;

  /**
   * Default constructor.
   * @param test Test pattern.
   * @param success Success pattern.
   * @param failure Failure pattern.
   */
  constructor(test: Pattern<R>, success: Pattern<R>, failure?: Pattern<R>) {
    super();
    this.#test = new Try<R>(test);
    this.#success = success;
    this.#failure = failure;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base<R>): boolean {
    if (this.#test.consume(source)) {
      return this.#success.consume(source);
    } else if (this.#failure) {
      return this.#failure.consume(source);
    }
    return false;
  }
}
