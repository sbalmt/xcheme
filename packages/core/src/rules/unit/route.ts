import type { Types } from '../../core/types';

import Base from '../route';

/**
 * Produce a route to consume units.
 */
export default class Route<T extends Types> extends Base<T> {
  /**
   * Default constructor.
   * @param first First route unit.
   * @param units Route units.
   */
  constructor(first: string | number, ...units: (string | number)[]) {
    super(null, first, ...units);
  }
}
