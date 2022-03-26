import * as Types from '../types';

import Identity from './identity';

/**
 * Optimized member node.
 */
export default class Node extends Identity {
  /**
   * Route node.
   */
  #route: Types.Node;

  /**
   * Default constructor.
   * @param node Original node.
   * @param identity Member identity.
   * @param route Route node.
   */
  constructor(node: Types.Node, identity: number, route: Types.Node) {
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
  get route(): Types.Node {
    return this.#route;
  }
}
