import type { Types } from '../../core/types';
import type Base from '../../source/base';

import Pattern from '../pattern';
import Uncase from '../transform/uncase';

/**
 * Consume one unit that is between all the acceptable units in the pattern.
 */
export default class Choose<T extends Types> extends Pattern<T> {
  /**
   * Set of units.
   */
  #units: Set<string | number>;

  /**
   * Default constructor.
   * @param units List of acceptable units.
   */
  constructor(...units: (string | number)[]) {
    super();
    this.#units = new Set(units);
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base<T>): boolean {
    if (source.length > 0) {
      const unit = Uncase.transform(source.value);
      if (this.#units.has(unit)) {
        source.next();
        return true;
      }
    }
    return false;
  }
}
