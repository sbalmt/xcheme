import Base from '../route';
import Pattern from '../pattern';
import Emit from './emit';

/**
 * Produce a route to consume units and, in case of success, it emits a new symbol record.
 */
export default class Route<R extends object> extends Base<R> {
  /**
   * Default constructor.
   * @param value Symbol value.
   * @param test Symbol pattern.
   * @param first Route pattern or first route unit.
   * @param units Route units.
   */
  constructor(
    value: string | number,
    test: Pattern<R>,
    first: Pattern<R> | string | number,
    ...units: (string | number)[]
  ) {
    if (first instanceof Pattern) {
      super(new Emit<R>(value, test, first), units[0], ...units.splice(1));
    } else {
      super(new Emit<R>(value, test), first, ...units);
    }
  }
}
