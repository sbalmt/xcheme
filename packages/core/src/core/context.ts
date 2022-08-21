import type * as Metadata from './metadata';

import { ErrorList } from './error';
import { TokenList } from './token';
import { Node } from './node';

import Fragment from './data/fragment';
import Location from './data/location';
import Range from './data/range';
import Table from './table';

/**
 * Contains the analysis context and depending on the solution, can store errors, tokens, symbols and
 * nodes from the current consumption.
 */
export default class Context<T extends Metadata.Types> {
  /**
   * Context errors.
   */
  #errors = new ErrorList();

  /**
   * Context tokens.
   */
  #tokens = new TokenList<T>();

  /**
   * Context symbol table.
   */
  #table = new Table<T>();

  /**
   * Context main node.
   */
  #node: Node<T>;

  /**
   * Context name.
   */
  #name: string;

  /**
   * Default constructor.
   * @param name Context name.
   */
  constructor(name: string) {
    const range = new Range(0, 0);
    const location = new Location(name, range, range);
    const fragment = new Fragment('', 0, 0, location);
    this.#node = new Node<T>(fragment, 0x00, this.#table);
    this.#name = name;
  }

  /**
   * Get the error list.
   */
  get errors(): ErrorList {
    return this.#errors;
  }

  /**
   * Get the token list.
   */
  get tokens(): TokenList<T> {
    return this.#tokens;
  }

  /**
   * Get the symbol table.
   */
  get table(): Table<T> {
    return this.#table;
  }

  /**
   * Get the root node.
   */
  get node(): Node<T> {
    return this.#node;
  }

  /**
   * Get the context name.
   */
  get name(): string {
    return this.#name;
  }
}
