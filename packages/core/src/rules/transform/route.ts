import type { Types } from '../../core/types';

import Base from '../route';
import Pattern from '../pattern';
import Uncase from './uncase';

/**
 * Produce a route to consume all the given patterns with the uncase transformation.
 */
export default class Route<T extends Types> extends Base<T> {
  /**
   * Default constructor.
   * @param pattern Route pattern.
   * @param first First route unit.
   * @param units Route units.
   */
  constructor(pattern: Pattern<T>, first: string | number, ...units: (string | number)[]) {
    super(new Uncase<T>(pattern), first, ...units);
  }
}
