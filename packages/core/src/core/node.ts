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
   * Node symbol table.
   */
  #table: Table;

  /**
   * Node value.
   */
  #value: string | number;

  /**
   * Default constructor
   * @param fragment Node fragment.
   * @param table Node symbol table.
   * @param value Node value.
   */
  constructor(fragment: Fragment, table: Table, value: string | number) {
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
   * Get the symbol table associated to the node.
   */
  get table(): Table {
    return this.#table;
  }

  /**
   * Get the node value.
   */
  get value(): string | number {
    return this.#value;
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
}
