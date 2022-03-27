import type * as Metadata from '../../core/metadata';
import type Base from '../../source/base';

import Pattern from '../pattern';
import Try from './try';

/**
 * Consume all the given patterns and invert the consumption state.
 */
export default class Not<T extends Metadata.Types> extends Pattern<T> {
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
   * @returns Returns the inverted consumption state.
   */
  consume(source: Base<T>): boolean {
    if (source.length > 0) {
      return !this.#target.consume(source);
    }
    return false;
  }
}
