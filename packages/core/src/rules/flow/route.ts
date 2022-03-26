import Base from '../route';
import Pattern from '../pattern';

/**
 * Produce a route to consume units and, in case of success, it consumes the specified pattern.
 */
export default class Route<R extends object> extends Base<R> {
  /**
   * Default constructor.
   * @param pattern Route pattern.
   * @param first First route unit.
   * @param units Route units.
   */
  constructor(pattern: Pattern<R>, first: string | number, ...units: (string | number)[]) {
    super(pattern, first, ...units);
  }
}
