import type { Types } from '../../core/types';
import type Base from '../../source/base';

import Pattern from '../pattern';
import Expect from '../flow/expect';

/**
 * Consume all the given patterns behind a new symbol table.
 */
export default class Scope<T extends Types> extends Pattern<T> {
  /**
   * Target pattern.
   */
  #target: Pattern<T>;

  /**
   * Default constructor.
   * @param patterns Sequence of patterns.
   */
  constructor(...patterns: Pattern<T>[]) {
    super();
    this.#target = new Expect<T>(...patterns);
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base<T>): boolean {
    const link = source.output.link;
    source.expand();
    if (link) {
      source.output.table.assign(link);
      source.output.link = void 0;
    }
    const status = this.#target.consume(source);
    source.collapse();
    return status;
  }
}
