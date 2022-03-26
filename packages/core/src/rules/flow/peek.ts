import type Base from '../../source/base';

import Pattern from '../pattern';
import Expect from './expect';

/**
 * Consume all the given patterns and always preserve the current source state.
 */
export default class Peek<R extends object> extends Pattern<R> {
  /**
   * Target pattern.
   */
  #target: Pattern<R>;

  /**
   * Default constructor.
   * @param pattern Sequence of patterns.
   */
  constructor(...patterns: Pattern<R>[]) {
    super();
    this.#target = new Expect<R>(...patterns);
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base<R>): boolean {
    source.save();
    const status = this.#target.consume(source);
    source.restore();
    source.discard();
    return status;
  }
}
