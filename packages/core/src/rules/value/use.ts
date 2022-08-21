import type { Types } from '../../core/types';

import Base from '../../source/base';
import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Change the current output value and Consume all the given patterns.
 */
export default class Use<T extends Types> extends Pattern<T> {
  /**
   * Target pattern.
   */
  #target: Pattern<T>;

  /**
   * Output value.
   */
  #value: number;

  /**
   * Default constructor.
   * @param value New value.
   * @param patterns Sequence of patterns.
   */
  constructor(value: number, ...patterns: Pattern<T>[]) {
    super();
    this.#target = new Expect<T>(...patterns);
    this.#value = value;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base<T>): boolean {
    source.output.value = this.#value;
    return this.#target.consume(source);
  }
}
