import type { Fragment } from '../core/coordinates';
import type { Context } from '../core/context';
import type { Types } from '../core/types';

import { Exception } from '../core/exception';
import { Token } from '../core/tokens';
import { Node, NodeDirection } from '../core/nodes';
import { LogRecord } from '../core/logs';
import { Options } from '../core/options';
import { Scope } from './scope';

/**
 * Source output structure.
 */
type Output<T extends Types> = {
  /**
   * Output state.
   */
  state: number;

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
   * Symbol table scope.
   */
  #scope: Scope<T>;

  /**
   * Default constructor.
   * @param context Source context.
   */
  constructor(context: Context<T>) {
    this.#context = context;
    this.#scope = new Scope<T>(context.table);
    this.#output = {
      state: 0
    };
  }

  /**
   * Get the source context name.
   */
  get name(): string {
    return this.#context.name;
  }

  /**
   * Get the source context options.
   */
  get options(): Options {
    return this.#context.options;
  }

  /**
   * Get the current source output.
   */
  get output(): Output<T> {
    return this.#output;
  }

  /**
   * Get the symbol scope.
   */
  get scope(): Scope<T> {
    return this.#scope;
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
  emit(product: Token<T> | Node<T> | LogRecord): void {
    if (product instanceof Token) {
      this.#context.tokens.insert(product);
    } else if (product instanceof Node) {
      const root = this.#context.node.lowest(NodeDirection.Next) ?? this.#context.node;
      root.set(NodeDirection.Next, product);
    } else if (product instanceof LogRecord) {
      this.#context.logs.insert(product);
    } else {
      throw new Exception(`Unsupported product type.`);
    }
  }
}
