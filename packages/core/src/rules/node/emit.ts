import Base from '../../source/base';
import Node, { Nodes } from '../../core/node';
import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consumes all the given patterns and, in case of success, it will emit a new node as the next child of the current node.
 * Any working node in the current source output will be attached as the left child from the new node.
 */
export default class Emit extends Pattern {
  /**
   * Target pattern.
   */
  #target: Pattern;

  /**
   * Token value.
   */
  #value: string | number;

  /**
   * Default constructor.
   * @param value Token value.
   * @param patterns Sequence of patterns.
   */
  constructor(value: string | number, ...patterns: Pattern[]) {
    super();
    this.#target = new Expect(...patterns);
    this.#value = value;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   * @throws Throws an error when there's no node to emit.
   */
  consume(source: Base): boolean {
    source.saveState();
    const status = this.#target.consume(source);
    if (status) {
      const { table, value } = source.output;
      const result = this.#value === Base.Output ? value ?? -1 : this.#value;
      const node = new Node(source.fragment, table, result);
      node.setChild(Nodes.Left, source.output.node);
      source.output.node = void 0;
      source.emit(node);
    }
    source.discardState();
    return status;
  }
}
