import type * as Metadata from '../../core/metadata';
import type Base from '../../source/base';

import Pattern from '../pattern';
import Try from './try';

/**
 * Consume the test pattern and, in case of success, it also consumes the success pattern.
 * Otherwise, it will consume the failure pattern (when specified).
 */
export default class Condition<T extends Metadata.Types> extends Pattern<T> {
  /**
   * Test pattern.
   */
  #test: Pattern<T>;

  /**
   * Success pattern.
   */
  #success: Pattern<T>;

  /**
   * Failure pattern.
   */
  #failure?: Pattern<T>;

  /**
   * Default constructor.
   * @param test Test pattern.
   * @param success Success pattern.
   * @param failure Failure pattern.
   */
  constructor(test: Pattern<T>, success: Pattern<T>, failure?: Pattern<T>) {
    super();
    this.#test = new Try<T>(test);
    this.#success = success;
    this.#failure = failure;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base<T>): boolean {
    if (this.#test.consume(source)) {
      return this.#success.consume(source);
    } else if (this.#failure) {
      return this.#failure.consume(source);
    }
    return false;
  }
}
