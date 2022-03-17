import * as Core from '@xcheme/core';

import * as Symbols from '../symbols';
import * as Identified from './identified';

/**
 * Directive node.
 */
export class Node extends Identified.Node {
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
   * Get whether or not the directive is an alias.
   */
  get alias(): boolean {
    return Symbols.isAlias(this.#record);
  }
}
