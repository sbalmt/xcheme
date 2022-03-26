import type Base from '../../source/base';

import Pattern from '../pattern';

/**
 * Consume one unit.
 */
export default class Any<R extends object> extends Pattern<R> {
  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base<R>): boolean {
    if (source.length > 0) {
      source.next();
      return true;
    }
    return false;
  }
}
