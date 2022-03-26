import Base from '../../source/base';
import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consume all the given patterns and, in case of success, it will change the current output value.
 */
export default class Set<R extends object> extends Pattern<R> {
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
    this.#target = new Expect<R>(...patterns);
    this.#value = value;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base<R>): boolean {
    if (this.#target.consume(source)) {
      source.output.value = this.#value;
      return true;
    }
    return false;
  }
}
