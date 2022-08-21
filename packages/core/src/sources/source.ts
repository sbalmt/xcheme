import type { Fragment } from '../core/coordinates';
import type { Types } from '../core/types';
import type Context from '../core/context';

import { Token } from '../core/tokens';
import { Node, NodeDirection } from '../core/nodes';
import { SymbolTable, SymbolRecord } from '../core/symbols';
import { Error } from '../core/errors';

import Exception from '../core/exception';

/**
 * Source output structure.
 */
type Output<T extends Types> = {
  /**
   * Output state.
   */
  state: number;

  /**
   * Output symbol table.
   */
  table: SymbolTable<T>;

  /**
   * Linked symbol table.
   */
  link?: SymbolTable<T>;

  /**
   * Output value.
   */
  value?: number;

  /**
   * Output node.
   */
  node?: Node<T>;
};

/**
 * Base of any data source for the analysis process.
 */
export class Source<T extends Types> {
  /**
   * Source context.
   */
  #context: Context<T>;

  /**
   * Current symbol table.
   */
  #table: SymbolTable<T>;

  /**
   * Current output.
   */
  #output: Output<T>;

  /**
   * Magic value for getting the current output value from the current source.
   */
  static get Output() {
    return 0xffffffff;
  }

  /**
   * Default constructor.
   * @param context Source context.
   */
  constructor(context: Context<T>) {
    this.#context = context;
    this.#table = context.table;
    this.#output = {
      state: 0,
      table: this.#table
    };
  }

  /**
   * Get the source context name.
   */
  get name(): string {
    return this.#context.name;
  }

  /**
   * Get the current source output.
   */
  get output(): Output<T> {
    return this.#output;
  }

  /**
   * Should be implemented to return the current source offset.
   */
  get offset(): number {
    throw new Exception(`Offset property doesn't implemented.`);
  }

  /**
   * Should be implemented to return the current source length.
   */
  get length(): number {
    throw new Exception(`Length property doesn't implemented.`);
  }

  /**
   * Should be implemented to return the current source value.
   */
  get value(): string | number {
    throw new Exception(`Value property doesn't implemented.`);
  }

  /**
   * Should be implemented to return the current source fragment.
   */
  get fragment(): Fragment {
    throw new Exception(`Fragment property doesn't implemented.`);
  }

  /**
   * Should be implement to push the current source state.
   */
  save(): void {
    throw new Exception(`Save method doesn't implemented.`);
  }

  /**
   * Should be implemented to restore the previous source state.
   */
  restore(): void {
    throw new Exception(`Restore method doesn't implemented.`);
  }

  /**
   * Should be implemented to pop the previous source state.
   */
  discard(): void {
    throw new Exception(`Discard method doesn't implemented.`);
  }

  /**
   * Should be implemented to move to the next source state.
   */
  next(): void {
    throw new Exception(`Next method doesn't implemented.`);
  }

  /**
   * Emit the given product in the current source context.
   * @param product Input product.
   * @throws Throws an error when the given product isn't supported.
   */
  emit(product: Error | Token<T> | Node<T> | SymbolRecord<T>): void {
    if (product instanceof Error) {
      this.#context.errors.insert(product);
    } else if (product instanceof Token) {
      this.#context.tokens.insert(product);
    } else if (product instanceof Node) {
      const root = this.#context.node.lowest(NodeDirection.Next) ?? this.#context.node;
      root.set(NodeDirection.Next, product);
    } else if (product instanceof SymbolRecord) {
      this.#table.insert(product);
    } else {
      throw new Exception(`Unsupported product type.`);
    }
  }

  /**
   * Open a new symbol table.
   */
  expand(): void {
    this.#table = new SymbolTable(this.#table);
    this.#output.table = this.#table;
  }

  /**
   * Close the current symbol table.
   * @throws Throws an error when there's no parent symbol table to be collapsed.
   */
  collapse(): void {
    if (!this.#table.parent) {
      throw new Exception(`There's no table to collapse.`);
    }
    if (this.#table.length > 0) {
      this.#output.link = this.#table;
    }
    this.#table = this.#table.parent;
    this.#output.table = this.#table;
  }
}
