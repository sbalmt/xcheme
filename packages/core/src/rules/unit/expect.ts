import type * as Metadata from '../../core/metadata';
import type Base from '../../source/base';

import Pattern from '../pattern';
import Uncase from '../transform/uncase';

/**
 * Consume all the units that are expected by the pattern.
 */
export default class Expect<T extends Metadata.Types> extends Pattern<T> {
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
  consume(source: Base<T>): boolean {
    for (const unit of this.#units) {
      if (source.length === 0 || unit !== Uncase.transform(source.value)) {
        return false;
      }
      source.next();
    }
    return true;
  }
}
