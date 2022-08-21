import type { Types } from '../../core/types';

import Base from '../route';
import Pattern from '../pattern';
import Emit from './emit';

/**
 * Produce a route to consume units and, in case of success, it emits a new token.
 */
export default class Route<T extends Types> extends Base<T> {
  /**
   * Default constructor.
   * @param value Token value.
   * @param first Route pattern or first route unit.
   * @param units Route units.
   */
  constructor(value: number, first: Pattern<T> | string | number, ...units: (string | number)[]) {
    if (first instanceof Pattern) {
      const [test, ...remaining] = units;
      super(new Emit<T>(value, first), test, ...remaining);
    } else {
      super(new Emit<T>(value), first, ...units);
    }
  }
}
