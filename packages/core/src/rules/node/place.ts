import type { Types } from '../../core/types';
import type { Nodes } from '../../core/node';
import type Base from '../../source/base';

import Pattern from '../pattern';
import Expect from '../flow/expect';

/**
 * Consume all the given patterns and, in case of success,
 * it places the resulting node into the source output node.
 */
export default class Place<T extends Types> extends Pattern<T> {
  /**
   * Target pattern.
   */
  #target: Pattern<T>;

  /**
   * Child node destination.
   */
  #current: Nodes;

  /**
   * Default constructor.
   * @param current Child destination in the current node.
   * @param patterns Sequence of patterns.
   */
  constructor(current: Nodes, ...patterns: Pattern<T>[]) {
    super();
    this.#target = new Expect<T>(...patterns);
    this.#current = current;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base<T>): boolean {
    const output = source.output;
    let current = output.node;
    output.node = void 0;
    const status = this.#target.consume(source);
    const child = output.node;
    if (status && child) {
      if (current) {
        const parent = current.lowest(this.#current) ?? current;
        parent.set(this.#current, child);
      } else {
        current = child;
      }
    }
    output.node = current;
    return status;
  }
}
