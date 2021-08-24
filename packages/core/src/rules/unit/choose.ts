import type Base from '../../source/base';

import Pattern from '../pattern';

/**
 * Consume one unit that is between all the acceptable units in the pattern.
 */
export default class Choose extends Pattern {
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
  consume(source: Base): boolean {
    if (source.length > 0) {
      if (this.#units.has(source.value)) {
        source.nextState();
        return true;
      }
    }
    return false;
  }
}
