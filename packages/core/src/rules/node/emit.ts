import type { Types } from '../../core/types';

import { Node, NodeDirection } from '../../core/nodes';
import { Source } from '../../sources';

import Expect from '../flow/expect';
import Pattern from '../pattern';

/**
 * Consume all the given patterns and, in case of success, it will emit a new node as the next child of the current one.
 * Any working node in the source output will be attached as the left child from the new node.
 */
export default class Emit<T extends Types> extends Pattern<T> {
  /**
   * Target pattern.
   */
  #target: Pattern<T>;

  /**
   * Token value.
   */
  #value: number;

  /**
   * Output node direction.
   */
  #output: NodeDirection;

  /**
   * Default constructor.
   * @param value Token value.
   * @param output Output node direction.
   * @param patterns Sequence of patterns.
   */
  constructor(value: number, output: NodeDirection, ...patterns: Pattern<T>[]) {
    super();
    this.#target = new Expect<T>(...patterns);
    this.#value = value;
    this.#output = output;
  }

  /**
   * Consume the given source.
   * @param source Data source.
   * @returns Returns true when the source was consumed, otherwise returns false.
   * @throws Throws an error when there's no node to emit.
   */
  consume(source: Source<T>): boolean {
    source.save();
    const status = this.#target.consume(source);
    if (status) {
      const { table, value } = source.output;
      const result = this.#value === Source.Output ? value ?? -1 : this.#value;
      const node = new Node<T>(source.fragment, result, table);
      node.set(this.#output, source.output.node);
      source.output.node = void 0;
      source.emit(node);
    }
    source.discard();
    return status;
  }
}
