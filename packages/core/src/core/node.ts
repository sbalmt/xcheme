import type Fragment from './fragment';
import type Table from './table';

/**
 * Internal nodes structure.
 */
type AllNodes = {
  [Nodes.Left]?: Node;
  [Nodes.Right]?: Node;
  [Nodes.Next]?: Node;
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
export default class Node {
  /**
   * Node children.
   */
  #children: AllNodes = {};

  /**
   * Node fragment.
   */
  #fragment: Fragment;

  /**
   * Node value.
   */
  #value: string | number;

  /**
   * Node symbol table.
   */
  #table: Table;

  /**
   * Default constructor
   * @param fragment Node fragment.
   * @param value Node value.
   * @param table Node table.
   */
  constructor(fragment: Fragment, value: string | number, table: Table) {
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
  get value(): string | number {
    return this.#value;
  }

  /**
   * Get the symbol table associated to the node.
   */
  get table(): Table {
    return this.#table;
  }

  /**
   * Get the child node on the left.
   */
  get left(): Node | undefined {
    return this.#children[Nodes.Left];
  }

  /**
   * Get the child node on the right.
   */
  get right(): Node | undefined {
    return this.#children[Nodes.Right];
  }

  /**
   * Get the child node on the next.
   */
  get next(): Node | undefined {
    return this.#children[Nodes.Next];
  }

  /**
   * Swap all the currently node properties by all properties from the given one.
   * @param node Input node.
   */
  swap(node: Node): void {
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
  getChild(child: Nodes): Node | undefined {
    return this.#children[child];
  }

  /**
   * Set the specified child node in the given direction.
   * @param child Child node direction.
   * @param node New child node.
   */
  setChild(child: Nodes, node: Node | undefined): void {
    this.#children[child] = node;
  }

  /**
   * Get the lowest child node in the given direction.
   * @param child Child node direction.
   * @returns Returns the corresponding child node.
   */
  getLowestChild(child: Nodes): Node | undefined {
    let current: Node | undefined = this;
    let node;
    while ((current = current.getChild(child))) {
      node = current;
    }
    return node;
  }

  /**
   * Iterable generator.
   */
  *[Symbol.iterator]() {
    let node: Node | undefined = this;
    do {
      yield node;
      node = node.next;
    } while (node !== void 0);
  }
}
