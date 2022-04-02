import type Fragment from './fragment';
import type Table from './table';

import * as Metadata from './metadata';

/**
 * Internal children nodes.
 */
type Children<T extends Metadata.Types> = {
  /**
   * Left child node.
   */
  [Nodes.Left]?: Node<T>;
  /**
   * Right child node.
   */
  [Nodes.Right]?: Node<T>;
  /**
   * Next child node.
   */
  [Nodes.Next]?: Node<T>;
};

/**
 * All children nodes.
 */
export const enum Nodes {
  Left,
  Right,
  Next
}

/**
 * A node product to compose the AST generated in the analysis process.
 */
export default class Node<T extends Metadata.Types> extends Metadata.Container<Metadata.Node<T>> {
  /**
   * Node children.
   */
  #children: Children<T> = {};

  /**
   * Node fragment.
   */
  #fragment: Fragment;

  /**
   * Node value.
   */
  #value: number;

  /**
   * Node symbol table.
   */
  #table: Table<T>;

  /**
   * Default constructor
   * @param fragment Node fragment.
   * @param value Node value.
   * @param table Node table.
   */
  constructor(fragment: Fragment, value: number, table: Table<T>) {
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
   * Get the symbol table associated to the node.
   */
  get table(): Table<T> {
    return this.#table;
  }

  /**
   * Get the child node on the left.
   */
  get left(): Node<T> | undefined {
    return this.#children[Nodes.Left];
  }

  /**
   * Get the child node on the right.
   */
  get right(): Node<T> | undefined {
    return this.#children[Nodes.Right];
  }

  /**
   * Get the child node on the next.
   */
  get next(): Node<T> | undefined {
    return this.#children[Nodes.Next];
  }

  /**
   * Swap all the node properties by all properties in the given node.
   * @param node Input node.
   */
  swap(node: Node<T>): void {
    super.swap(node);
    [this.#children, node.#children] = [node.#children, this.#children];
    [this.#fragment, node.#fragment] = [node.#fragment, this.#fragment];
    [this.#table, node.#table] = [node.#table, this.#table];
    [this.#value, node.#value] = [node.#value, this.#value];
  }

  /**
   * Get a child node in the specified direction.
   * @param child Child node direction.
   * @returns Return the corresponding child node.
   */
  get(child: Nodes): Node<T> | undefined {
    return this.#children[child];
  }

  /**
   * Set the specified child node in the given direction.
   * @param child Child node direction.
   * @param node New child node.
   */
  set(child: Nodes, node: Node<T> | undefined): void {
    this.#children[child] = node;
  }

  /**
   * Get the lowest child node in the given direction.
   * @param child Child node direction.
   * @returns Returns the corresponding child node.
   */
  lowest(child: Nodes): Node<T> | undefined {
    let current: Node<T> | undefined = this;
    let node;
    while ((current = current.get(child))) {
      node = current;
    }
    return node;
  }

  /**
   * Iterable generator.
   */
  *[Symbol.iterator]() {
    let node: Node<T> | undefined = this;
    do {
      yield node;
      node = node.next;
    } while (node !== void 0);
  }
}
