import type Base from '../../source/base';

import Pattern from '../pattern';
import Expect from './expect';

/**
 * Consumes all the given patterns and, in case of failure, it preserves the current source state.
 */
export default class Try extends Pattern {
  /**
   * Target pattern.
   */
  #target: Pattern;

  /**
   * Default constructor.
   * @param pattern Sequence of patterns.
   */
  constructor(...patterns: Pattern[]) {
    super();
    this.#target = new Expect(...patterns);
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base): boolean {
    source.saveState();
    const status = this.#target.consume(source);
    if (!status) {
      source.restoreState();
    }
    source.discardState();
    return status;
  }
}
