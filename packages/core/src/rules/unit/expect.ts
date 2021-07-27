import type Base from '../../source/base';

import Pattern from '../pattern';

/**
 * Consumes all the units that are expected by the pattern.
 */
export default class Expect extends Pattern {
  /**
   * Array of units.
   */
  #units: (string | number)[];

  /**
   * Default constructor.
   * @param units List of expected units.
   */
  constructor(...units: (string | number)[]) {
    super();
    this.#units = units;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base): boolean {
    for (const unit of this.#units) {
      if (source.length === 0 || source.value !== unit) {
        return false;
      }
      source.move();
    }
    return true;
  }
}
