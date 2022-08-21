import type { Types } from '../../core/types';
import type { Source } from '../../sources';

import Pattern from '../pattern';
import Expect from './expect';
import Try from './try';

/**
 * Consume all the given patterns in this pattern and, in case of success, retry the consumption.
 */
export default class Repeat<T extends Types> extends Pattern<T> {
  /**
   * Target pattern.
   */
  #target: Pattern<T>;

  /**
   * Triable pattern.
   */
  #triable: Pattern<T>;

  /**
   * Default constructor.
   * @param patterns Sequence of patterns.
   */
  constructor(...patterns: Pattern<T>[]) {
    super();
    this.#target = new Expect<T>(...patterns);
    this.#triable = new Try<T>(this.#target);
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Source<T>): boolean {
    if (this.#target.consume(source)) {
      while (this.#triable.consume(source));
      return true;
    }
    return false;
  }
}
