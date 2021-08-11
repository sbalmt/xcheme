import type Context from '../core/context';
import type Fragment from '../core/fragment';

import Error from '../core/error';
import Token from '../core/token';
import Node, { Nodes } from '../core/node';
import Record from '../core/record';
import Table from '../core/table';

/**
 * Source output structure.
 */
type Output = {
  /**
   * Output state.
   */
  state: number;

  /**
   * Output table.
   */
  table: Table;

  /**
   * Output value.
   */
  value?: string | number;

  /**
   * Output node.
   */
  node?: Node;
};

/**
 * Base of any data source for the analysis process.
 */
export default class Base {
  /**
   * Source context.
   */
  #context: Context;

  /**
   * Current symbol table manager.
   */
  #table: Table;

  /**
   * Current source output.
   */
  #output: Output;

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
  constructor(context: Context) {
    this.#context = context;
    this.#table = context.table;
    this.#output = {
      state: 0,
      table: this.#table
    };
  }

  /**
   * Get the current source output.
   */
  get output(): Output {
    return this.#output;
  }

  /**
   * Should be implemented to return the current source offset.
   */
  get offset(): number {
    throw "Property doesn't implemented.";
  }

  /**
   * Should be implemented to return the current source length.
   */
  get length(): number {
    throw "Property doesn't implemented.";
  }

  /**
   * Should be implemented to return the current source value.
   */
  get value(): string | number {
    throw "Property doesn't implemented.";
  }

  /**
   * Should be implemented to return the current source fragment.
   */
  get fragment(): Fragment {
    throw "Property doesn't implemented.";
  }

  /**
   * Should be implement to push the current source state.
   */
  public saveState(): void {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to restore the previous source state.
   */
  public restoreState(): void {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to pop the previous source state.
   */
  public discardState(): void {
    throw "Method doesn't implemented.";
  }

  /**
   * Should be implemented to move to the next source state.
   */
  public move(): void {
    throw "Move method doesn't implemented.";
  }

  /**
   * Emit the given product in the current source context.
   * @param product Input product.
   * @throws Throws an error when the given product isn't supported.
   */
  public emit(product: Error | Token | Node | Record): void {
    if (product instanceof Error) {
      this.#context.errors.push(product);
    } else if (product instanceof Token) {
      this.#context.tokens.push(product);
    } else if (product instanceof Node) {
      const root = this.#context.node.getLowestChild(Nodes.Next) ?? this.#context.node;
      root.setChild(Nodes.Next, product);
    } else if (product instanceof Record) {
      this.#table.addRecord(product);
    } else {
      throw 'Unsupported product type.';
    }
  }

  /**
   * Open a new symbol table.
   */
  public openTable(): void {
    this.#table = new Table(this.#table);
    this.#output.table = this.#table;
  }

  /**
   * Close the current symbol table.
   * @throws Throws an error when there's no parent symbol table to be collapsed.
   */
  public closeTable(): void {
    if (!this.#table.parent) {
      throw "There's no parent symbol table to collapse.";
    }
    this.#table = this.#table.parent;
    this.#output.table = this.#table;
  }
}
