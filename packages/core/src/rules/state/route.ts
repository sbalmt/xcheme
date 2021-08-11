import Base from '../route';
import Pattern from '../pattern';
import Set from './set';

/**
 * Produce a route to consume units and in case of success it set a new state value.
 */
export default class Route extends Base {
  /**
   * Default constructor.
   * @param value State value.
   * @param first Route pattern or the first unit.
   * @param units Route units.
   */
  constructor(value: number, first: Pattern | string | number, ...units: (string | number)[]) {
    if (first instanceof Pattern) {
      super(new Set(value, first), ...units);
    } else {
      super(new Set(value), first, ...units);
    }
  }
}
