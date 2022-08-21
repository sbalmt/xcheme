import type { Types } from '../core/types';
import type { Source } from '../sources/source';

import Exception from '../core/exception';

/**
 * Base of any pattern class.
 */
export default abstract class Pattern<T extends Types> {
  /**
   * Should be implemented to consume the given source.
   * @param source Should receive the data source.
   * @returns Should returns true when the data source was consumed, otherwise should return false.
   */
  consume(source: Source<T>): boolean {
    throw new Exception(`Consume method doesn't implemented.`);
  }
}
