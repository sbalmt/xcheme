import type Base from '../../source/base';

import Pattern from '../pattern';
import Uncase from '../transform/uncase';

/**
 * Consume one unit that is in the range accepted by the pattern.
 */
export default class Range extends Pattern {
  /**
   * Beginning of the boundary unit.
   */
  #begin: string | number;

  /**
   * End of the boundary unit.
   */
  #end: string | number;

  /**
   * Default constructor.
   * @param begin Beginning of the boundary unit.
   * @param end End of the boundary unit.
   */
  constructor(begin: string | number, end: string | number) {
    super();
    this.#begin = begin;
    this.#end = end;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base): boolean {
    if (source.length > 0) {
      const unit = Uncase.transform(source.value);
      if (unit >= this.#begin && unit <= this.#end) {
        source.next();
        return true;
      }
    }
    return false;
  }
}
