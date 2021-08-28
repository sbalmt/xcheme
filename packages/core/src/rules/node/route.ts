import Base from '../route';
import Pattern from '../pattern';
import { Nodes } from '../../core/node';
import Emit from './emit';

/**
 * Produce a route to consume units and, in case of success, it emits a new node.
 * Any working node in the source output will be attached as the left child from the new node.
 */
export default class Route extends Base {
  /**
   * Default constructor.
   * @param value Node value.
   * @param output Output node destination.
   * @param first Route pattern or first route unit.
   * @param units Route units.
   */
  constructor(value: string | number, output: Nodes, first: Pattern | string | number, ...units: (string | number)[]) {
    if (first instanceof Pattern) {
      super(new Emit(value, output, first), units[0], ...units.splice(1));
    } else {
      super(new Emit(value, output), first, ...units);
    }
  }
}
