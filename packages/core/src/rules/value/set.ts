import Base from '../../source/base';
import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consumes all the given patterns and, in case of success, it will change the current output value.
 */
export default class Set extends Pattern {
  /**
   * Target pattern.
   */
  #target: Pattern;

  /**
   * Token value.
   */
  #value: string | number;

  /**
   * Default constructor.
   * @param value New value.
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
    if (this.#target.consume(source)) {
      source.output.value = this.#value;
      return true;
    }
    return false;
  }
}
