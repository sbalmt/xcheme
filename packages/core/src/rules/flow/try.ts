import type * as Metadata from '../../core/metadata';
import type Base from '../../source/base';

import Pattern from '../pattern';
import Expect from './expect';

/**
 * Consume all the given patterns and, in case of failure, it preserves the current source state.
 */
export default class Try<T extends Metadata.Types> extends Pattern<T> {
  /**
   * Target pattern.
   */
  #target: Pattern<T>;

  /**
   * Default constructor.
   * @param pattern Sequence of patterns.
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
    source.save();
    const status = this.#target.consume(source);
    if (!status) {
      source.restore();
    }
    source.discard();
    return status;
  }
}
