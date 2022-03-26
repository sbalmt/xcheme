import * as Core from '@xcheme/core';

import * as Types from '../types';

import Basic from './basic';

/**
 * Optimized identity node.
 */
export default class Node extends Basic {
  /**
   * Node identity.
   */
  #identity: number;

  /**
   * Default constructor.
   * @param node Original node.
   * @param identity Node identity.
   */
  constructor(node: Types.Node, identity: number) {
    super(node);
    this.#identity = identity;
  }

  /**
   * Determines whether or not the identity is empty.
   */
  get empty(): boolean {
    return Number.isNaN(this.#identity);
  }

  /**
   * Determines whether or not the identity is dynamic.
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
