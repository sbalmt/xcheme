import type * as Metadata from '../../core/metadata';

import Base from '../../source/base';
import Node, { Nodes } from '../../core/node';
import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consume all the given patterns in this pattern and, in case of success,
 * it creates a new node in the source output and pivot current ones.
 */
export default class Pivot<T extends Metadata.Types> extends Pattern<T> {
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
  #output: Nodes;

  /**
   * Current node destination.
   */
  #current: Nodes;

  /**
   * Default constructor.
   * @param value Node value.
   * @param output Output node destination.
   * @param current Current node destination.
   * @param head Pivot head pattern.
   * @param patterns Sequence of patterns.
   */
  constructor(value: number, output: Nodes, current: Nodes, head: Pattern<T>, ...patterns: Pattern<T>[]) {
    super();
    if (current === output) {
      throw "Current and Output destinations can't have the same value.";
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
  consume(source: Base<T>): boolean {
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
        const result = this.#value === Base.Output ? value ?? -1 : this.#value;
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
