import type Base from '../../source/base';

import Pattern from '../pattern';

/**
 * Consumes the pattern object returned by the callback given for this pattern.
 */
export default class Run extends Pattern {
  /**
   * Callback for the pattern.
   */
  #callback: () => Pattern;

  /**
   * Default constructor.
   * @param callback Callback for the pattern.
   */
  constructor(callback: () => Pattern) {
    super();
    this.#callback = callback;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base): boolean {
    return this.#callback().consume(source);
  }
}
