import * as Core from '@xcheme/core';

import * as Identity from './identity';

/**
 * Member entry.
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
   * Determines whether or not the entry can have a dynamic identity.
   */
  dynamic: boolean;
};

/**
 * Member node.
 */
export class Node extends Identity.Node {
  /**
   * Node entry.
   */
  #entry: Entry;

  /**
   * Member route node.
   */
  #route: Core.Node;

  /**
   * Default constructor.
   * @param node Original node.
   * @param entry Node entry.
   * @param route Route node.
   */
  constructor(node: Core.Node, entry: Entry, route: Core.Node) {
    super(node, entry.identity);
    this.#entry = entry;
    this.#route = route;
  }

  /**
   * Get whether or not the directive can have a dynamic identity.
   */
  get dynamic(): boolean {
    return this.#entry.dynamic;
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
