import Base from '../../source/base';
import Node, { Nodes } from '../../core/node';
import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consume all the given patterns in this pattern and, in case of success,
 * it prepends a new node in the source output node.
 */
export default class Prepend<R extends object> extends Pattern<R> {
  /**
   * Head pattern.
   */
  #head: Pattern<R>;

  /**
   * Target pattern.
   */
  #target: Pattern<R>;

  /**
   * Node value.
   */
  #value: string | number;

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
   * @param head Prepend head pattern.
   * @param patterns Sequence of patterns.
   */
  constructor(value: string | number, output: Nodes, current: Nodes, head: Pattern<R>, ...patterns: Pattern<R>[]) {
    super();
    this.#head = head;
    this.#target = new Expect<R>(...patterns);
    this.#value = value;
    this.#output = output;
    this.#current = current;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base<R>): boolean {
    source.save();
    const output = source.output;
    let current = output.node;
    output.node = void 0;
    let status = this.#head.consume(source);
    if (status) {
      const fragment = source.fragment;
      if ((status = this.#target.consume(source))) {
        const { table, value } = output;
        const result = this.#value === Base.Output ? value ?? -1 : this.#value;
        const child = new Node<R>(fragment, result, table);
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
