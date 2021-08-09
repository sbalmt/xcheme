import type Base from '../../source/base';
import type { Nodes } from '../../core/node';

import Pattern from '../pattern';
import Expect from '../flow/expect';

/**
 * Consumes all the given patterns and, in case of success,
 * it places the resulting node into the current source output node.
 */
export default class Place extends Pattern {
  /**
   * Target pattern.
   */
  #target: Pattern;

  /**
   * Child node destination.
   */
  #current: Nodes;

  /**
   * Default constructor.
   * @param current Child destination in the current node.
   * @param patterns Sequence of patterns.
   */
  constructor(current: Nodes, ...patterns: Pattern[]) {
    super();
    this.#target = new Expect(...patterns);
    this.#current = current;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base): boolean {
    const output = source.output;
    let current = output.node;
    output.node = void 0;
    const status = this.#target.consume(source);
    const child = output.node;
    if (status && child) {
      if (current) {
        const parent = current.getLowestChild(this.#current) ?? current;
        parent.setChild(this.#current, child);
      } else {
        current = child;
      }
    }
    output.node = current;
    return status;
  }
}
