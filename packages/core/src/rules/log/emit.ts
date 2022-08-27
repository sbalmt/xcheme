import type { Types } from '../../core/types';

import { LogRecord, LogType } from '../../core/logs';
import { Source } from '../../sources';

import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consume all the given patterns and, in case of success, it will emit a new log into the current log list.
 */
export default class Emit<T extends Types> extends Pattern<T> {
  /**
   * Target pattern.
   */
  #target: Pattern<T>;

  /**
   * Log type.
   */
  #type: LogType;

  /**
   * Log value.
   */
  #value: number;

  /**
   * Default constructor.
   * @param type Log type.
   * @param value Log value.
   * @param patterns Sequence of patterns.
   */
  constructor(type: LogType, value: number, ...patterns: Pattern<T>[]) {
    super();
    this.#target = new Expect<T>(...patterns);
    this.#type = type;
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
      const record = new LogRecord(this.#type, source.fragment, result);
      source.emit(record);
    }
    source.discard();
    return status;
  }
}
