import type { Types } from '../../core/types';

import { Error } from '../../core/errors';
import { Source } from '../../sources';

import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consume all the given patterns and, in case of success, it will emit a new error into the current error list.
 */
export default class Emit<T extends Types> extends Pattern<T> {
  /**
   * Target pattern.
   */
  #target: Pattern<T>;

  /**
   * Error value.
   */
  #value: number;

  /**
   * Default constructor.
   * @param value Error value.
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
      const error = new Error(source.fragment, result);
      source.emit(error);
    }
    source.discard();
    return status;
  }
}
