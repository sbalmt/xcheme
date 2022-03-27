import type * as Metadata from '../../core/metadata';

import Base from '../route';

/**
 * Produce a route to consume units.
 */
export default class Route<T extends Metadata.Types> extends Base<T> {
  /**
   * Default constructor.
   * @param first First route unit.
   * @param units Route units.
   */
  constructor(first: string | number, ...units: (string | number)[]) {
    super(null, first, ...units);
  }
}
