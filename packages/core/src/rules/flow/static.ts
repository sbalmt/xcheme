import type * as Metadata from '../../core/metadata';
import type Base from '../../source/base';

import Pattern from '../pattern';

/**
 * Doesn't consume anything and returns the static state given for this pattern.
 */
export default class Static<T extends Metadata.Types> extends Pattern<T> {
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
  consume(source: Base<T>): boolean {
    return this.#value;
  }
}
