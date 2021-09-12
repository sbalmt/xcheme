import * as Core from '@xcheme/core';

import * as Identity from './identity';

/**
 * Directive node.
 */
export class Node extends Identity.Node {
  /**
   * Determines whether or not the directive is an alias.
   */
  #alias: boolean;

  /**
   * Default constructor.
   * @param node Original node.
   * @param identity Node identity.
   * @param alias Determines whether or not the directive is an alias.
   */
  constructor(node: Core.Node, identity: number, alias: boolean) {
    super(node, identity);
    this.#alias = alias;
  }

  /**
   * Get whether or not the node is an alias.
   */
  get alias(): boolean {
    return this.#alias;
  }

  /**
   * Get the node name.
   */
  get name(): string {
    return this.fragment.data;
  }
}
