import Base from '../route';
import Pattern from '../pattern';
import Set from './set';

/**
 * Produce a route to consume units and, in case of success, it emits a new token.
 */
export default class Route<R extends object> extends Base<R> {
  /**
   * Default constructor.
   * @param value New value.
   * @param first Route pattern or first route unit.
   * @param units Route units.
   */
  constructor(value: number, first: Pattern<R> | string | number, ...units: (string | number)[]) {
    if (first instanceof Pattern) {
      const [test, ...remaining] = units;
      super(new Set<R>(value, first), test, ...remaining);
    } else {
      super(new Set<R>(value), first, ...units);
    }
  }
}
