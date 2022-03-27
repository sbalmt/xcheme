import type * as Metadata from '../../core/metadata';
import type Base from '../../source/base';

import Pattern from '../pattern';

/**
 * Doesn't consume anything, but it expects the end of the given data source.
 */
export default class End<T extends Metadata.Types> extends Pattern<T> {
  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was ended, otherwise returns false.
   */
  consume(source: Base<T>): boolean {
    return source.length === 0;
  }
}
