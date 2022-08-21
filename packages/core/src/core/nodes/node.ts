import type { Fragment } from '../coordinates';
import type { SymbolTable } from '../symbols';

import { Data } from '../collections';
import { Types, NodeType } from '../types';
import { NodeDirection } from './direction';

/**
 * Internal children nodes.
 */
type Children<T extends Types> = {
  /**
   * Left child node.
   */
  [NodeDirection.Left]?: Node<T>;
  /**
   * Right child node.
   */
  [NodeDirection.Right]?: Node<T>;
  /**
   * Next child node.
   */
  [NodeDirection.Next]?: Node<T>;
};

/**
 * A node element for the abstract syntax tree (AST) generated in the analysis process.
 */
export class Node<T extends Types> extends Data<NodeType<T>> implements Iterable<Node<T>> {
  /**
   * Node children.
   */
  #children: Children<T> = {};

  /**
   * Node fragment.
   */
  #fragment: Fragment;

  /**
   * Node symbol table.
   */
  #table: SymbolTable<T>;

  /**
   * Node value.
   */
  #value: number;

  /**
   * Default constructor
   * @param fragment Node fragment.
   * @param value Node value.
   * @param table Node symbol table.
   */
  constructor(fragment: Fragment, value: number, table: SymbolTable<T>) {
    super();
    this.#fragment = fragment;
    this.#table = table;
    this.#value = value;
  }

  /**
   * Get the node fragment.
   */
  get fragment(): Fragment {
    return this.#fragment;
  }

  /**
   * Get the node value.
   */
  get value(): number {
    return this.#value;
  }

  /**
   * Get the node symbol table.
   */
  get table(): SymbolTable<T> {
    return this.#table;
  }

  /**
   * Get the child node on the left.
   */
  get left(): Node<T> | undefined {
    return this.#children[NodeDirection.Left];
  }

  /**
   * Get the child node on the right.
   */
  get right(): Node<T> | undefined {
    return this.#children[NodeDirection.Right];
  }

  /**
   * Get the next child node.
   */
  get next(): Node<T> | undefined {
    return this.#children[NodeDirection.Next];
  }

  /**
   * Get the corresponding child node for the given direction.
   * @param child Child node direction.
   * @returns Return the corresponding child node or undefined when the child isn't set.
   */
  get(child: NodeDirection): Node<T> | undefined {
    return this.#children[child];
  }

  /**
   * Set the given child node for the specified direction.
   * @param child Child node direction.
   * @param node New child node.
   */
  set(child: NodeDirection, node: Node<T> | undefined): void {
    this.#children[child] = node;
  }

  /**
   * Get the lowest child node for the given direction.
   * @param child Child node direction.
   * @returns Returns the corresponding child node or undefined when the child isn't set.
   */
  lowest(child: NodeDirection): Node<T> | undefined {
    let current: Node<T> | undefined = this;
    let node;
    while ((current = current.get(child))) {
      node = current;
    }
    return node;
  }

  /**
   * Get a shallow copy of the node.
   * @returns Returns the node copy.
   */
  clone(): Node<T> {
    const result = new Node(this.#fragment, this.#value, this.#table);
    result.#children = { ...this.#children };
    if (this.assigned) {
      result.assign(this.data);
    }
    return result;
  }

  /**
   * Swap all contents of the given node.
   * @param node Node instance.
   */
  swap(node: Node<T>): void {
    super.swap(node);
    [this.#children, node.#children] = [node.#children, this.#children];
    [this.#fragment, node.#fragment] = [node.#fragment, this.#fragment];
    [this.#table, node.#table] = [node.#table, this.#table];
    [this.#value, node.#value] = [node.#value, this.#value];
  }

  /**
   * Iterable generator.
   */
  *[Symbol.iterator](): Iterator<Node<T>> {
    let node: Node<T> | undefined = this;
    do {
      yield node;
      node = node.next;
    } while (node !== void 0);
  }
}
