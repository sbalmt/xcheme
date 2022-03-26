import type Base from '../../source/base';

import Pattern from '../pattern';
import Try from './try';

/**
 * Consume all the given patterns in this pattern as an optional behavior.
 */
export default class Opt<R extends object> extends Pattern<R> {
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
   * @returns Returns true anyways.
   */
  consume(source: Base<R>): boolean {
    this.#target.consume(source);
    return true;
  }
}
