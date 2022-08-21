import type { Types } from '../../core/types';

import { Node, NodeDirection } from '../../core/nodes';
import { Source } from '../../sources';

import Exception from '../../core/exception';
import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consume all the given patterns in this pattern and, in case of success,
 * it creates a new node in the source output and pivot current ones.
 */
export default class Pivot<T extends Types> extends Pattern<T> {
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
   * Output node direction.
   */
  #output: NodeDirection;

  /**
   * Current node direction.
   */
  #current: NodeDirection;

  /**
   * Default constructor.
   * @param value Node value.
   * @param output Output node direction.
   * @param current Current node direction.
   * @param head Pivot head pattern.
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
    if (current === output) {
      throw new Exception(`Current and Output destination can't have the same value.`);
    }
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
    let status = this.#head.consume(source);
    if (status) {
      const output = source.output;
      const { table, value } = output;
      const fragment = source.fragment;
      const current = output.node;
      output.node = void 0;
      if (!(status = this.#target.consume(source))) {
        output.node = current;
      } else {
        const result = this.#value === Source.Output ? value ?? -1 : this.#value;
        const child = new Node<T>(fragment, result, table);
        child.set(this.#output, output.node);
        child.set(this.#current, current);
        output.node = child;
      }
    }
    source.discard();
    return status;
  }
}
