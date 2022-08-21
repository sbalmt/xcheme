import type { Types } from '../../core/types';

import { Node, NodeDirection } from '../../core/nodes';
import { Source } from '../../sources';

import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consume all the given patterns in this pattern and, in case of success,
 * it prepends a new node in the source output node.
 */
export default class Prepend<T extends Types> extends Pattern<T> {
  /**
   * Head pattern.
   */
  #head: Pattern<T>;

  /**
   * Target pattern.
   */
  #target: Pattern<T>;

  /**
   * Node value.
   */
  #value: number;

  /**
   * Output node destination.
   */
  #output: NodeDirection;

  /**
   * Current node destination.
   */
  #current: NodeDirection;

  /**
   * Default constructor.
   * @param value Node value.
   * @param output Output node direction.
   * @param current Current node direction.
   * @param head Prepend head pattern.
   * @param patterns Sequence of patterns.
   */
  constructor(
    value: number,
    output: NodeDirection,
    current: NodeDirection,
    head: Pattern<T>,
    ...patterns: Pattern<T>[]
  ) {
    super();
    this.#head = head;
    this.#target = new Expect<T>(...patterns);
    this.#value = value;
    this.#output = output;
    this.#current = current;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Source<T>): boolean {
    source.save();
    const output = source.output;
    let current = output.node;
    output.node = void 0;
    let status = this.#head.consume(source);
    if (status) {
      const fragment = source.fragment;
      if ((status = this.#target.consume(source))) {
        const { table, value } = output;
        const result = this.#value === Source.Output ? value ?? -1 : this.#value;
        const child = new Node<T>(fragment, result, table);
        child.set(this.#output, output.node);
        if (current) {
          const parent = child.lowest(this.#current) ?? child;
          parent.set(this.#current, current);
        }
        current = child;
      }
    }
    output.node = current;
    source.discard();
    return status;
  }
}
