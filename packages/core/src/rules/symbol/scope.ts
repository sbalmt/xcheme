import type Base from '../../source/base';

import Pattern from '../pattern';
import Expect from '../flow/expect';

/**
 * Consume all the given patterns behind a new symbol table.
 */
export default class Scope<R extends object> extends Pattern<R> {
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
    this.#target = new Expect<R>(...patterns);
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base<R>): boolean {
    source.expand();
    const status = this.#target.consume(source);
    source.collapse();
    return status;
  }
}
