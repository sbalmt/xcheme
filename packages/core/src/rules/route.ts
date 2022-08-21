import type { Types } from '../core/types';
import type Pattern from './pattern';

/**
 * Base of any route for using together with map patterns.
 */
export default class Route<T extends Types> {
  /**
   * Route pattern.
   */
  #pattern: Pattern<T> | null;

  /**
   * Route units.
   */
  #units: (string | number)[];

  /**
   * Default constructor.
   * @param pattern Route pattern.
   * @param first First route unit.
   * @param units Remaining route units.
   */
  constructor(pattern: Pattern<T> | null, first: string | number, ...units: (string | number)[]) {
    this.#pattern = pattern;
    this.#units = [first, ...units];
  }

  /**
   * Get the route pattern.
   */
  get pattern(): Pattern<T> | null {
    return this.#pattern;
  }

  /**
   * Get the route units.
   */
  get units(): (string | number)[] {
    return this.#units;
  }
}
