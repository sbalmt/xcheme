import * as Symbols from '../symbols';
import * as Types from '../types';

import Identity from './identity';

/**
 * Optimized directive node.
 */
export default class Node extends Identity {
  /**
   * Directive record.
   */
  #record: Types.Record;

  /**
   * Default constructor.
   * @param node Original node.
   * @param record Symbol record.
   */
  constructor(node: Types.Node, record: Types.Record) {
    super(node, record.data.identity);
    this.#record = record;
  }

  /**
   * Get the directive order.
   */
  get order(): number {
    return this.#record.data.order;
  }

  /**
   * Determines whether or not the directive is a template.
   */
  get template(): boolean {
    return this.#record.data.template;
  }

  /**
   * Get the directive identifier.
   */
  get identifier(): string {
    return this.#record.fragment.data;
  }

  /**
   * Get the directive type.
   */
  get type(): Types.Directives {
    return this.#record.data.type;
  }

  /**
   * Determines whether or not the directive is an alias.
   */
  get alias(): boolean {
    return Symbols.isAlias(this.#record);
  }
}
