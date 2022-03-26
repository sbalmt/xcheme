import type Fragment from './fragment';
import type Table from './table';

/**
 * Internal children nodes.
 */
type Children<R extends object> = {
  /**
   * Left child node.
   */
  [Nodes.Left]?: Node<R>;
  /**
   * Right child node.
   */
  [Nodes.Right]?: Node<R>;
  /**
   * Next child node.
   */
  [Nodes.Next]?: Node<R>;
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
export default class Node<R extends object> {
  /**
   * Node children.
   */
  #children: Children<R> = {};

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
  #table: Table<R>;

  /**
   * Default constructor
   * @param fragment Node fragment.
   * @param value Node value.
   * @param table Node table.
   */
  constructor(fragment: Fragment, value: number, table: Table<R>) {
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
  get table(): Table<R> {
    return this.#table;
  }

  /**
   * Get the child node on the left.
   */
  get left(): Node<R> | undefined {
    return this.#children[Nodes.Left];
  }

  /**
   * Get the child node on the right.
   */
  get right(): Node<R> | undefined {
    return this.#children[Nodes.Right];
  }

  /**
   * Get the child node on the next.
   */
  get next(): Node<R> | undefined {
    return this.#children[Nodes.Next];
  }

  /**
   * Swap all the currently node properties by all properties from the given one.
   * @param node Input node.
   */
  swap(node: Node<R>): void {
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
  get(child: Nodes): Node<R> | undefined {
    return this.#children[child];
  }

  /**
   * Set the specified child node in the given direction.
   * @param child Child node direction.
   * @param node New child node.
   */
  set(child: Nodes, node: Node<R> | undefined): void {
    this.#children[child] = node;
  }

  /**
   * Get the lowest child node in the given direction.
   * @param child Child node direction.
   * @returns Returns the corresponding child node.
   */
  lowest(child: Nodes): Node<R> | undefined {
    let current: Node<R> | undefined = this;
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
    let node: Node<R> | undefined = this;
    do {
      yield node;
      node = node.next;
    } while (node !== void 0);
  }
}
