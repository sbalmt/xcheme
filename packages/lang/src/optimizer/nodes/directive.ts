import * as Core from '@xcheme/core';

import * as Identity from './identity';

import * as Entries from '../../core/entries';

/**
 * Directive node.
 */
export class Node extends Identity.Node {
  /**
   * Node entry.
   */
  #entry: Entries.Entry;

  /**
   * Default constructor.
   * @param node Original node.
   * @param entry Node entry.
   */
  constructor(node: Core.Node, entry: Entries.Entry) {
    super(node, entry.identity, entry.dynamic);
    this.#entry = entry;
  }

  /**
   * Get whether or not the directive is an alias.
   */
  get alias(): boolean {
    return this.#entry.type === Entries.Types.Alias;
  }

  /**
   * Get the directive identifier.
   */
  get identifier(): string {
    return this.#entry.identifier;
  }
}
