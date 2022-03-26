import type Base from '../../source/base';

import Pattern from '../pattern';

/**
 * Consume the pattern object returned by the callback given for this pattern.
 */
export default class Run<R extends object> extends Pattern<R> {
  /**
   * Callback for the pattern.
   */
  #callback: () => Pattern<R>;

  /**
   * Default constructor.
   * @param callback Callback for the pattern.
   */
  constructor(callback: () => Pattern<R>) {
    super();
    this.#callback = callback;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base<R>): boolean {
    return this.#callback().consume(source);
  }
}
