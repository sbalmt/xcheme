import type { Types } from '../../core/types';
import type { Source } from '../../sources';

import Pattern from '../pattern';

/**
 * Consume one unit.
 */
export default class Any<T extends Types> extends Pattern<T> {
  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Source<T>): boolean {
    if (source.length > 0) {
      source.next();
      return true;
    }
    return false;
  }
}
