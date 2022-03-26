import type Base from '../source/base';

/**
 * Base of any pattern class.
 */
export default abstract class Pattern<R extends object> {
  /**
   * Should be implemented to consume the given source.
   * @param source Should receive the data source.
   * @returns Should returns true when the data source was consumed, otherwise should return false.
   */
  consume(source: Base<R>): boolean {
    throw "Consume method doesn't implemented.";
  }
}
