import Base from '../../source/base';
import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consumes all the given patterns with the uncase transformation.
 */
export default class Uncase<R extends object> extends Pattern<R> {
  /**
   * Target pattern.
   */
  #target: Pattern<R>;

  /**
   * Default constructor.
   * @param patterns Sequence of patterns.
   */
  constructor(...patterns: Pattern<R>[]) {
    super();
    this.#target = new Expect<R>(...patterns);
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base<R>): boolean {
    const current = Uncase.#state;
    Uncase.#state = true;
    const result = this.#target.consume(source);
    Uncase.#state = current;
    return result;
  }

  /**
   * Current state.
   */
  static #state = false;

  /**
   * Transform the given unit according to the current state.
   * @param unit Input unit.
   * @returns Returns the unit transformation.
   */
  static transform(unit: string | number): string | number {
    return Uncase.active && typeof unit === 'string' ? unit.toLocaleLowerCase() : unit;
  }

  /**
   * Determines whether or not the uncase is active.
   */
  static get active(): boolean {
    return Uncase.#state;
  }
}
