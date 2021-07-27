import Base from '../route';
import Pattern from '../pattern';
import Emit from './emit';

/**
 * Produce a route to consume units and in case of success it emits a new symbol record.
 */
export default class Route extends Base {
  /**
   * Default constructor.
   * @param value Symbol value.
   * @param first Route pattern or the first unit.
   * @param units Route units.
   */
  constructor(value: string | number, first: Pattern | string | number, ...units: (string | number)[]) {
    if (first instanceof Pattern) {
      super(new Emit(value, first), ...units);
    } else {
      super(new Emit(value), first, ...units);
    }
  }
}
