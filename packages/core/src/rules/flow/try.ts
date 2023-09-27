import type { Types } from '../../core/types';
import type { Source } from '../../sources';

import Pattern from '../pattern';
import Expect from './expect';

/**
 * Consume all the given patterns and, in case of failure, it preserves the current source state.
 */
export default class Try<T extends Types> extends Pattern<T> {
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
  consume(source: Source<T>): boolean {
    source.save();
    source.scope.save();
    const status = this.#target.consume(source);
    if (!status) {
      source.scope.restore();
      source.restore();
    }
    source.scope.discard();
    source.discard();
    return status;
  }
}
