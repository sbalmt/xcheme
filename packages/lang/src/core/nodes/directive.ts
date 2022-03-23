import * as Core from '@xcheme/core';

import * as Symbols from '../symbols';

import Identity from './identity';

/**
 * Optimized directive node.
 */
export default class Node extends Identity {
  /**
   * Directive record.
   */
  #record: Core.Record;

  /**
   * Default constructor.
   * @param node Original node.
   * @param record Symbol record.
   */
  constructor(node: Core.Node, record: Core.Record) {
    super(node, record.data.identity);
    this.#record = record;
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
  get type(): Symbols.Types {
    return this.#record.data.type as Symbols.Types;
  }

  /**
   * Determines whether or not the directive is an alias.
   */
  get alias(): boolean {
    return Symbols.isAlias(this.#record);
  }
}
