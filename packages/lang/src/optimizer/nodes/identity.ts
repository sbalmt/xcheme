import * as Core from '@xcheme/core';

import * as Basic from './basic';

/**
 * Identity node.
 */
export class Node extends Basic.Node {
  /**
   * Node identity.
   */
  #identity: number;

  /**
   * Determines whether or not the node can have a dynamic identity.
   */
  #dynamic: boolean;

  /**
   * Default constructor.
   * @param node Original node.
   * @param identity Node identity.
   * @param dynamic Determines whether or not the node can have a dynamic identity.
   */
  constructor(node: Core.Node, identity: number, dynamic: boolean) {
    super(node);
    this.#identity = identity;
    this.#dynamic = dynamic;
  }

  /**
   * Get the node identity.
   */
  get identity(): number {
    return this.#identity;
  }

  /**
   * Get whether or not the node can have a dynamic identity.
   */
  get dynamic(): boolean {
    return this.#dynamic;
  }
}
