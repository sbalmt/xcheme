import type Base from '../../source/base';

import Pattern from '../pattern';
import Expect from '../flow/expect';

/**
 * Consumes all the given patterns behind a new symbol table.
 */
export default class Scope extends Pattern {
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
    this.#target = new Expect(...patterns);
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base): boolean {
    source.openTable();
    const status = this.#target.consume(source);
    source.closeTable();
    return status;
  }
}
