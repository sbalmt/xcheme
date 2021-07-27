import Base from '../../source/base';
import Record from '../../core/record';
import Pattern from '../pattern';
import Expect from '../flow/expect';

/**
 * Consumes all the given patterns and, in case of success, it will emit a new symbol into the current symbol table.
 */
export default class Emit extends Pattern {
  /**
   * Target pattern.
   */
  #target: Pattern;

  /**
   * Symbol value.
   */
  #value: string | number;

  /**
   * Default constructor.
   * @param value Symbol value.
   * @param patterns Sequence of patterns.
   */
  constructor(value: string | number, ...patterns: Pattern[]) {
    super();
    this.#target = new Expect(...patterns);
    this.#value = value;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base): boolean {
    source.saveState();
    const status = this.#target.consume(source);
    if (status) {
      const { node, value } = source.output;
      const result = this.#value === Base.Output ? value ?? -1 : this.#value;
      const record = new Record(source.fragment, node, result);
      source.emit(record);
    }
    source.discardState();
    return status;
  }
}
