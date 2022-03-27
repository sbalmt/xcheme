import type * as Metadata from '../../core/metadata';

import Base from '../../source/base';
import Record from '../../core/record';
import Pattern from '../pattern';
import Expect from '../flow/expect';
import Error, { Errors } from '../../core/error';

/**
 * Consume all the given patterns and, in case of success, it will emit a new symbol into the current symbol table.
 */
export default class Emit<T extends Metadata.Types> extends Pattern<T> {
  /**
   * Test pattern.
   */
  #test: Pattern<T>;

  /**
   * Target pattern.
   */
  #target: Pattern<T>;

  /**
   * Symbol value.
   */
  #value: number;

  /**
   * Default constructor.
   * @param value Symbol value.
   * @param test Symbol pattern.
   * @param patterns Sequence of patterns.
   */
  constructor(value: number, test: Pattern<T>, ...patterns: Pattern<T>[]) {
    super();
    this.#test = test;
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
    let status = this.#test.consume(source);
    if (status) {
      const { node, table, value } = source.output;
      const fragment = source.fragment;
      if ((status = this.#target.consume(source))) {
        if (table.has(fragment)) {
          const error = new Error(fragment, Errors.DUPLICATE_IDENTIFIER);
          source.emit(error);
        } else {
          const result = this.#value === Base.Output ? value ?? -1 : this.#value;
          const record = new Record<T>(fragment, result, node, source.output.link);
          source.output.link = void 0;
          source.emit(record);
        }
      }
    }
    source.discard();
    return status;
  }
}
