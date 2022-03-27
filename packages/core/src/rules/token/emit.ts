import type * as Metadata from '../../core/metadata';

import Base from '../../source/base';
import Token from '../../core/token';
import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consume all the given patterns and, in case of success, it will emit a new token into the current token list.
 */
export default class Emit<T extends Metadata.Types> extends Pattern<T> {
  /**
   * Target pattern.
   */
  #target: Pattern<T>;

  /**
   * Token value.
   */
  #value: number;

  /**
   * Default constructor.
   * @param value Token value.
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
    source.save();
    const status = this.#target.consume(source);
    if (status) {
      const { value } = source.output;
      const result = this.#value === Base.Output ? value ?? -1 : this.#value;
      const token = new Token<T>(source.fragment, result);
      source.emit(token);
    }
    source.discard();
    return status;
  }
}
