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
   * Get whether or not the identity is empty.
   */
  get empty(): boolean {
    return Number.isNaN(this.#identity);
  }

  /**
   * Get whether or not the identity is dynamic.
   */
  get dynamic(): boolean {
    return this.#identity === Core.BaseSource.Output;
  }

  /**
   * Get the node identity.
   */
  get identity(): number {
    return this.#identity;
  }
}
