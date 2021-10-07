import * as Core from '@xcheme/core';

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
 * Directive entry.
 */
export type Entry = {
  /**
   * Entry identifier.
   */
  identifier: string;
  /**
   * Entry identity.
   */
  identity: number;
  /**
   * Determines whether or not the entry is an alias.
   */
  alias: boolean;
  /**
   * Determines whether or not the entry can have a dynamic identity.
   */
  dynamic: boolean;
};

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
  #entry: Entry;

  /**
   * Default constructor.
   * @param node Original node.
   * @param type Directive type.
   * @param entry Node entry.
   */
  constructor(node: Core.Node, type: Types, entry: Entry) {
    super(node, entry.identity);
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
   * Get whether or not the directive can have a dynamic identity.
   */
  get dynamic(): boolean {
    return this.#entry.dynamic;
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
