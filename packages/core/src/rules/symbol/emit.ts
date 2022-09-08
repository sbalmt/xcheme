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
    let link = source.scope.link;
    source.scope.link = void 0;
    let status = this.#test.consume(source);
    if (status) {
      const { node, value } = source.output;
      const fragment = source.fragment;
      const table = source.scope.table;
      if ((status = this.#target.consume(source))) {
        if (link && source.scope.link) {
          link.assign(source.scope.link);
        } else if (source.scope.link) {
          link = source.scope.link;
        }
        if (table.has(fragment)) {
          const { errors } = source.options;
          const record = new LogRecord(LogType.ERROR, fragment, errors.duplicateSymbolIdentifier);
          source.emit(record);
        } else {
          const result = this.#value === Source.Output ? value ?? -1 : this.#value;
          const record = new SymbolRecord<T>(fragment, result, node, link);
          source.scope.link = void 0;
          source.scope.emit(record);
        }
      }
    }
    if (!status) {
      source.scope.link = link;
    }
    source.discard();
    return status;
  }
}
