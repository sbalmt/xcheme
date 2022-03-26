import type Base from '../../source/base';

import Pattern from '../pattern';

/**
 * Doesn't consume anything and returns the static state given for this pattern.
 */
export default class Static<R extends object> extends Pattern<R> {
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
  consume(source: Base<R>): boolean {
    return this.#value;
  }
}
