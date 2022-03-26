import Base from '../../source/base';
import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Change the current output value and Consume all the given patterns.
 */
export default class Use<R extends object> extends Pattern<R> {
  /**
   * Target pattern.
   */
  #target: Pattern<R>;

  /**
   * Output value.
   */
  #value: number;

  /**
   * Default constructor.
   * @param value New value.
   * @param patterns Sequence of patterns.
   */
  constructor(value: number, ...patterns: Pattern<R>[]) {
    super();
    this.#target = new Expect(...patterns);
    this.#value = value;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base<R>): boolean {
    source.output.value = this.#value;
    return this.#target.consume(source);
  }
}
