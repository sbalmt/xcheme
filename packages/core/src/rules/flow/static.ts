import type { Types } from '../../core/types';
import type { Source } from '../../sources';

import Pattern from '../pattern';

/**
 * Doesn't consume anything and returns the static state given for this pattern.
 */
export default class Static<T extends Types> extends Pattern<T> {
  /**
   * Static value.
   */
  #value: boolean;

  /**
   * Default constructor.
   * @param value Static value.
   */
  constructor(value: boolean) {
    super();
    this.#value = value;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns the static result.
   */
  consume(source: Source<T>): boolean {
    return this.#value;
  }
}
