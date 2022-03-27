import type * as Metadata from '../../core/metadata';

import Base from '../route';
import Pattern from '../pattern';
import Emit from './emit';

/**
 * Produce a route to consume units and, in case of success, it emits a new symbol record.
 */
export default class Route<T extends Metadata.Types> extends Base<T> {
  /**
   * Default constructor.
   * @param value Symbol value.
   * @param test Symbol pattern.
   * @param first Route pattern or first route unit.
   * @param units Route units.
   */
  constructor(value: number, test: Pattern<T>, first: Pattern<T> | string | number, ...units: (string | number)[]) {
    if (first instanceof Pattern) {
      super(new Emit<T>(value, test, first), units[0], ...units.splice(1));
    } else {
      super(new Emit<T>(value, test), first, ...units);
    }
  }
}
