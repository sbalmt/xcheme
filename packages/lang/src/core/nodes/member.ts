import * as Core from '@xcheme/core';

import Identity from './identity';

/**
 * Optimized member node.
 */
export default class Node extends Identity {
  /**
   * Route node.
   */
  #route: Core.Node;

  /**
   * Default constructor.
   * @param node Original node.
   * @param identity Member identity.
   * @param route Route node.
   */
  constructor(node: Core.Node, identity: number, route: Core.Node) {
    super(node, identity);
    this.#route = route;
  }

  /**
   * Determines whether or not the member has a route.
   */
  get empty(): boolean {
    return this.#route.fragment === this.fragment;
  }

  /**
   * Get the member route.
   */
  get route(): Core.Node {
    return this.#route;
  }
}
