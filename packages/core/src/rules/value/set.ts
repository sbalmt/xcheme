import type * as Metadata from '../../core/metadata';

import Base from '../../source/base';
import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consume all the given patterns and, in case of success, it will change the current output value.
 */
export default class Set<T extends Metadata.Types> extends Pattern<T> {
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
    if (this.#target.consume(source)) {
      source.output.value = this.#value;
      return true;
    }
    return false;
  }
}
