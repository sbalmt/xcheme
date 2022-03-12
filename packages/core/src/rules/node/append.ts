import Base from '../../source/base';
import Node, { Nodes } from '../../core/node';
import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consume all the given patterns in this pattern and, in case of success,
 * it appends a new node in the source output node.
 */
export default class Append extends Pattern {
  /**
   * Head pattern.
   */
  #head: Pattern;

  /**
   * Target pattern.
   */
  #target: Pattern;

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
   * @param current Child node destination.
   * @param head Append head pattern.
   * @param patterns Sequence of patterns.
   */
  constructor(value: string | number, output: Nodes, current: Nodes, head: Pattern, ...patterns: Pattern[]) {
    super();
    this.#head = head;
    this.#target = new Expect(...patterns);
    this.#value = value;
    this.#output = output;
    this.#current = current;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   */
  consume(source: Base): boolean {
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
        const child = new Node(fragment, result, table);
        child.set(this.#output, output.node);
        if (current) {
          const parent = current.lowest(this.#current) ?? current;
          parent.set(this.#current, child);
        } else {
          current = child;
        }
      }
    }
    output.node = current;
    source.discard();
    return status;
  }
}
