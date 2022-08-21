import type { Types } from '../../core/types';
import type { Source } from '../../sources';

import Pattern from '../pattern';
import Try from './try';

/**
 * Consume all the given patterns in this pattern as an optional behavior.
 */
export default class Opt<T extends Types> extends Pattern<T> {
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
    this.#target = new Try<T>(...patterns);
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true anyways.
   */
  consume(source: Source<T>): boolean {
    this.#target.consume(source);
    return true;
  }
}
