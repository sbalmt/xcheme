import type * as Metadata from './metadata';
import type Token from './token';

import Error from './error';
import Fragment from './fragment';
import Location from './location';
import Range from './range';
import Table from './table';
import Node from './node';

/**
 * Contains the analysis context and depending on the solution, can store errors, tokens, symbols and
 * nodes from the current consumption.
 */
export default class Context<T extends Metadata.Types> {
  /**
   * Context errors.
   */
  #errors: Error[] = [];

  /**
   * Context tokens.
   */
  #tokens: Token<T>[] = [];

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
  get errors(): Error[] {
    return this.#errors;
  }

  /**
   * Get the token list.
   */
  get tokens(): Token<T>[] {
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

  /**
   * Add a new error in the context.
   * @param fragment Error fragment.
   * @param value Error value.
   */
  addError(fragment: Fragment, value: number): void {
    this.#errors.push(new Error(fragment, value));
  }
}
