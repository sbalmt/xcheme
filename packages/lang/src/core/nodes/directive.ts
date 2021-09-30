import * as Core from '@xcheme/core';

import * as Entries from '../entries';
import * as Identity from './identity';

/**
 * Directive types.
 */
export const enum Types {
  Skip,
  Token,
  Node
}

/**
 * Directive node.
 */
export class Node extends Identity.Node {
  /**
   * Directive type.
   */
  #type: Types;

  /**
   * Node entry.
   */
  #entry: Entries.Entry;

  /**
   * Default constructor.
   * @param node Original node.
   * @param type Directive type.
   * @param entry Node entry.
   */
  constructor(node: Core.Node, type: Types, entry: Entries.Entry) {
    super(node, entry.identity, entry.dynamic);
    this.#type = type;
    this.#entry = entry;
  }

  /**
   * Get the directive type.
   */
  get type(): Types {
    return this.#type;
  }

  /**
   * Get whether or not the directive is an alias.
   */
  get alias(): boolean {
    return this.#entry.alias;
  }

  /**
   * Get the directive identifier.
   */
  get identifier(): string {
    return this.#entry.identifier;
  }
}
