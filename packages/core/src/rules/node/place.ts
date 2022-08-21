import type { Types } from '../../core/types';
import type { NodeDirection } from '../../core/nodes';
import type { Source } from '../../sources';

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
   * Current node direction.
   */
  #current: NodeDirection;

  /**
   * Default constructor.
   * @param current Current node direction.
   * @param patterns Sequence of patterns.
   */
  constructor(current: NodeDirection, ...patterns: Pattern<T>[]) {
    super();
    this.#target = new Expect<T>(...patterns);
    this.#current = current;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Source<T>): boolean {
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
