import Base from '../../source/base';
import Node, { Nodes } from '../../core/node';
import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consumes all the given patterns in this pattern and, in case of success,
 * it prepends the resulting node in the current source output node.
 */
export default class Prepend extends Pattern {
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
   * @param current Current node destination.
   * @param patterns Sequence of patterns.
   */
  constructor(value: string | number, output: Nodes, current: Nodes, ...patterns: Pattern[]) {
    super();
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
    source.saveState();
    const output = source.output;
    let current = output.node;
    output.node = void 0;
    const status = this.#target.consume(source);
    if (status) {
      const { table, value } = output;
      const result = this.#value === Base.Output ? value ?? -1 : this.#value;
      const child = new Node(source.fragment, table, result);
      child.setChild(this.#output, output.node);
      if (current) {
        const parent = child.getLowestChild(this.#current) ?? child;
        parent.setChild(this.#current, current);
      }
      current = child;
    }
    output.node = current;
    source.discardState();
    return status;
  }
}
