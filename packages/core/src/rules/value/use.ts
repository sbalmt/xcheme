import Base from '../../source/base';
import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Change the current output value and Consume all the given patterns.
 */
export default class Use extends Pattern {
  /**
   * Target pattern.
   */
  #target: Pattern;

  /**
   * Output value.
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
    source.output.value = this.#value;
    return this.#target.consume(source);
  }
}