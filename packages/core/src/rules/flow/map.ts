import type Base from '../../source/base';
import type Route from '../route';

import Pattern from '../pattern';
import Expect from '../unit/expect';
import Try from './try';

/**
 * Internal route.
 */
type InternalRoute = {
  /**
   * Test pattern.
   */
  test: Pattern;
  /**
   * Target pattern.
   */
  target: Pattern;
};

/**
 * Consumes the first route that match in the list of routes given for this pattern.
 */
export default class Map extends Pattern {
  /**
   * List of routes.
   */
  #routes: InternalRoute[];

  /**
   * Default constructor.
   * @param routes List of routes.
   */
  constructor(...routes: Route[]) {
    super();
    this.#routes = routes
      .sort((a, b) => b.units.length - a.units.length)
      .map((route) => ({
        test: new Try(new Expect(...route.units)),
        target: route.pattern
      }));
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base): boolean {
    for (const route of this.#routes) {
      if (route.test.consume(source)) {
        return route.target.consume(source);
      }
    }
    return false;
  }
}
