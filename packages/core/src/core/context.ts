import type { Types } from './types';

import { Fragment, Location, Range } from './coordinates';
import { LogList } from './logs';
import { TokenList } from './tokens';
import { Node } from './nodes/node';
import { SymbolTable } from './symbols';
import { Options } from './options';

/**
 * Default options.
 */
const DEFAULT_OPTIONS: Options = {
  errors: {
    duplicateSymbolIdentifier: 0x1000
  }
};

/**
 * Contains the analysis context and depending on the solution, can store errors, tokens, symbols and
 * nodes from the current consumption.
 */
export class Context<T extends Types> {
  /**
   * Context logs.
   */
  #logs = new LogList();

  /**
   * Context tokens.
   */
  #tokens = new TokenList<T>();

  /**
   * Context symbol table.
   */
  #table = new SymbolTable<T>();

  /**
   * Context main node.
   */
  #node: Node<T>;

  /**
   * Context name.
   */
  #name: string;

  /**
   * Context options.
   */
  #options: Options;

  /**
   * Default constructor.
   * @param name Context name.
   * @param options Context options.
   */
  constructor(name: string, options: Options = { ...DEFAULT_OPTIONS }) {
    const range = new Range(0, 0);
    const location = new Location(name, range, range);
    const fragment = new Fragment('', 0, 0, location);
    this.#node = new Node<T>(fragment, 0x00, this.#table);
    this.#name = name;
    this.#options = options;
  }

  /**
   * Get the log list.
   */
  get logs(): LogList {
    return this.#logs;
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
  get table(): SymbolTable<T> {
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
   * Get the context options.
   */
  get options(): Options {
    return this.#options;
  }
}
