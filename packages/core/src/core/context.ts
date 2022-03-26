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
export default class Context<R extends object> {
  /**
   * Context errors.
   */
  #errors: Error[] = [];

  /**
   * Context tokens.
   */
  #tokens: Token[] = [];

  /**
   * Context symbol table.
   */
  #table = new Table<R>();

  /**
   * Context main node.
   */
  #node: Node<R>;

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
    this.#node = new Node<R>(fragment, 0x00, this.#table);
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
  get tokens(): Token[] {
    return this.#tokens;
  }

  /**
   * Get the symbol table.
   */
  get table(): Table<R> {
    return this.#table;
  }

  /**
   * Get the root node.
   */
  get node(): Node<R> {
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
