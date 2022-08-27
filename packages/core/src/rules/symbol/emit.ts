import type { Types } from '../../core/types';

import { LogRecord, LogType } from '../../core/logs';
import { SymbolRecord } from '../../core/symbols';
import { Source } from '../../sources';

import Pattern from '../pattern';
import Expect from '../flow/expect';

/**
 * Consume all the given patterns and, in case of success, it will emit a new symbol into the current symbol table.
 */
export default class Emit<T extends Types> extends Pattern<T> {
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
  consume(source: Source<T>): boolean {
    source.save();
    let link = source.output.link;
    source.output.link = void 0;
    let status = this.#test.consume(source);
    if (status) {
      const { node, table, value } = source.output;
      const fragment = source.fragment;
      if ((status = this.#target.consume(source))) {
        if (link && source.output.link) {
          link.assign(source.output.link);
        } else if (source.output.link) {
          link = source.output.link;
        }
        if (table.has(fragment)) {
          const { errors } = source.options;
          const record = new LogRecord(LogType.ERROR, fragment, errors.duplicateSymbolIdentifier);
          source.emit(record);
        } else {
          const result = this.#value === Source.Output ? value ?? -1 : this.#value;
          const record = new SymbolRecord<T>(fragment, result, node, link);
          source.output.link = void 0;
          source.emit(record);
        }
      }
    }
    if (!status) {
      source.output.link = link;
    }
    source.discard();
    return status;
  }
}
