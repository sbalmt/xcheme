import type { Types } from '../../core/types';

import { Token } from '../../core/tokens';
import { Source } from '../../sources';

import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consume all the given patterns and, in case of success, it will emit a new token into the current token list.
 */
export default class Emit<T extends Types> extends Pattern<T> {
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
  consume(source: Source<T>): boolean {
    source.save();
    const status = this.#target.consume(source);
    if (status) {
      const { value } = source.output;
      const result = this.#value === Source.Output ? value ?? -1 : this.#value;
      const token = new Token<T>(source.fragment, result);
      source.emit(token);
    }
    source.discard();
    return status;
  }
}
