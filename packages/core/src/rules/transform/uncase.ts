import type { Types } from '../../core/types';
import type { Source } from '../../sources';

import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consumes all the given patterns with the uncase transformation.
 */
export default class Uncase<T extends Types> extends Pattern<T> {
  /**
   * Target pattern.
   */
  #target: Pattern<T>;

  /**
   * Default constructor.
   * @param patterns Sequence of patterns.
   */
  constructor(...patterns: Pattern<T>[]) {
    super();
    this.#target = new Expect<T>(...patterns);
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Source<T>): boolean {
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
