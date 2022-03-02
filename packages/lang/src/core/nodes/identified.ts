import * as Core from '@xcheme/core';

import * as Basic from './basic';

/**
 * Identified node.
 */
export class Node extends Basic.Node {
  /**
   * Node identity.
   */
  #identity: number;

  /**
   * Default constructor.
   * @param node Original node.
   * @param identity Node identity.
   */
  constructor(node: Core.Node, identity: number) {
    super(node);
    this.#identity = identity;
  }

  /**
   * Get the node identity.
   */
  get identity(): number {
    return this.#identity;
  }
}
