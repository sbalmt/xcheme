import type { Types } from '../../core/types';

import Base from '../route';
import Pattern from '../pattern';
import Set from './set';

/**
 * Produce a route to consume units and, in case of success, it set a new state value.
 */
export default class Route<T extends Types> extends Base<T> {
  /**
   * Default constructor.
   * @param value State value.
   * @param first Route pattern or first route unit.
   * @param units Route units.
   */
  constructor(value: number, first: Pattern<T> | string | number, ...units: (string | number)[]) {
    if (first instanceof Pattern) {
      super(new Set<T>(value, first), units[0], ...units.splice(1));
    } else {
      super(new Set<T>(value), first, ...units);
    }
  }
}
