import Base from '../../source/base';
import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consumes all the given patterns and, in case of success, it will set a new state value.
 */
export default class Set<R extends object> extends Pattern<R> {
  /**
   * Target pattern.
   */
  #target: Pattern<R>;

  /**
   * State value.
   */
  #value: number;

  /**
   * Default constructor.
   * @param value State value.
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
      source.output.state = this.#value;
      return true;
    }
    return false;
  }
}
