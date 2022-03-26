import type Base from '../../source/base';

import Pattern from '../pattern';
import Expect from './expect';
import Try from './try';

/**
 * Consume all the given patterns in this pattern and, in case of success, retry the consumption.
 */
export default class Repeat<R extends object> extends Pattern<R> {
  /**
   * Target pattern.
   */
  #target: Pattern<R>;

  /**
   * Triable pattern.
   */
  #triable: Pattern<R>;

  /**
   * Default constructor.
   * @param patterns Sequence of patterns.
   */
  constructor(...patterns: Pattern<R>[]) {
    super();
    this.#target = new Expect<R>(...patterns);
    this.#triable = new Try<R>(this.#target);
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base<R>): boolean {
    if (this.#target.consume(source)) {
      while (this.#triable.consume(source));
      return true;
    }
    return false;
  }
}
