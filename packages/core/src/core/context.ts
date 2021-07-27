import type Token from './token';

import Fragment from './fragment';
import Location from './location';
import Table from './table';
import Node from './node';

/**
 * Contains the analysis context and depending on the solution, can store tokens, symbol records and
 * nodes of the current consumption.
 */
export default class Context {
  /**
   * Context tokens.
   */
  #tokens: Token[] = [];

  /**
   * Context symbol table.
   */
  #table = new Table();

  /**
   * Context main node.
   */
  #node = new Node(new Fragment('', 0, 0, new Location(0, 0)), this.#table, 0x00);

  /**
   * Context name.
   */
  #name: string;

  /**
   * Default constructor.
   * @param name Context name.
   */
  constructor(name: string) {
    this.#name = name;
  }

  /**
   * Get the token list.
   */
  get tokens(): Token[] {
    return this.#tokens;
  }

  /**
   * Get the symbol table.
   */
  get table(): Table {
    return this.#table;
  }

  /**
   * Get the root node.
   */
  get node(): Node {
    return this.#node;
  }

  /**
   * Get the context name.
   */
  get name(): string {
    return this.#name;
  }
}
