import type { Types } from '../../core/types';

import { LogType } from '../../core/logs';

import Base from '../route';
import Pattern from '../pattern';
import Emit from './emit';

/**
 * Produce a route to consume units and, in case of success, it emits a new log.
 */
export default class Route<T extends Types> extends Base<T> {
  /**
   * Default constructor.
   * @param type Log type.
   * @param value Log value.
   * @param first Route pattern or first route unit.
   * @param units Route units.
   */
  constructor(type: LogType, value: number, first: Pattern<T> | string | number, ...units: (string | number)[]) {
    if (first instanceof Pattern) {
      super(new Emit<T>(type, value, first), units[0], ...units.splice(1));
    } else {
      super(new Emit<T>(type, value), first, ...units);
    }
  }
}
