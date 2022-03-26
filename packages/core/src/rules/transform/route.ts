import Base from '../route';
import Pattern from '../pattern';
import Uncase from './uncase';

/**
 * Produce a route to consume all the given patterns with the uncase transformation.
 */
export default class Route<R extends object> extends Base<R> {
  /**
   * Default constructor.
   * @param pattern Route pattern.
   * @param first First route unit.
   * @param units Route units.
   */
  constructor(pattern: Pattern<R>, first: string | number, ...units: (string | number)[]) {
    super(new Uncase<R>(pattern), first, ...units);
  }
}
