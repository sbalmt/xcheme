import type Pattern from './pattern';

/**
 * Base of any route used together with routing patterns.
 */
export default class Route {
  /**
   * Route pattern.
   */
  #pattern: Pattern;

  /**
   * Route units.
   */
  #units: (string | number)[];

  /**
   * Default constructor.
   * @param pattern Route pattern.
   * @param units Route units.
   */
  constructor(pattern: Pattern, ...units: (string | number)[]) {
    this.#pattern = pattern;
    this.#units = units;
  }

  /**
   * Get the route pattern.
   */
  get pattern(): Pattern {
    return this.#pattern;
  }

  /**
   * Get the route units.
   */
  get units(): (string | number)[] {
    return this.#units;
  }
}
