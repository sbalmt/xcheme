import type { Types } from '../../core/types';
import type { Source } from '../../sources';

import Pattern from '../pattern';

/**
 * Doesn't consume anything, but it expects the end of the given data source.
 */
export default class Stop<T extends Types> extends Pattern<T> {
  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was ended, otherwise returns false.
   */
  consume(source: Source<T>): boolean {
    return source.length === 0;
  }
}
