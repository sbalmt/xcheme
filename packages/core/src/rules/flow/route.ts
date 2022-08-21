import type { Types } from '../../core/types';

import Base from '../route';
import Pattern from '../pattern';

/**
 * Produce a route to consume units and, in case of success, it consumes the specified pattern.
 */
export default class Route<T extends Types> extends Base<T> {
  /**
   * Default constructor.
   * @param pattern Route pattern.
   * @param first First route unit.
   * @param units Route units.
   */
  constructor(pattern: Pattern<T>, first: string | number, ...units: (string | number)[]) {
    super(pattern, first, ...units);
  }
}
