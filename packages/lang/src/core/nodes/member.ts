import * as Core from '@xcheme/core';

import * as Identity from './identity';

/**
 * Member node.
 */
export class Node extends Identity.Node {
  /**
   * Member entry.
   */
  #entry: Core.Node;

  /**
   * Default constructor.
   * @param node Original node.
   * @param identity Entry identity.
   * @param dynamic Determines whether or not the member can have a dynamic identity.
   * @param entry Entry node.
   */
  constructor(node: Core.Node, identity: number, dynamic: boolean, entry: Core.Node) {
    super(node, identity, dynamic);
    this.#entry = entry;
  }

  /**
   * Determines whether or not the member is empty.
   */
  get empty(): boolean {
    return this.#entry.fragment === this.fragment;
  }

  /**
   * Get the member entry.
   */
  get entry(): Core.Node {
    return this.#entry;
  }
}
