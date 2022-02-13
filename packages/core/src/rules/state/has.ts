import Base from '../../source/base';
import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consume all the given patterns when the specified state value is defined.
 */
export default class Has extends Pattern {
  /**
   * Target pattern.
   */
  #target: Pattern;

  /**
   * State value.
   */
  #value: number;

  /**
   * Default constructor.
   * @param value State value.
   * @param patterns Sequence of patterns.
   */
  constructor(value: number, ...patterns: Pattern[]) {
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
    if (source.output.state === this.#value) {
      return this.#target.consume(source);
    }
    return false;
  }
}
