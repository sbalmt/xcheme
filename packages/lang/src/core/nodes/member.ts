import * as Core from '@xcheme/core';

import * as Identity from './identity';

/**
 * Member node.
 */
export class Node extends Identity.Node {
  /**
   * Symbol record.
   */
  #record: Core.Record;

  /**
   * Route node.
   */
  #route: Core.Node;

  /**
   * Default constructor.
   * @param node Original node.
   * @param record Symbol record.
   * @param route Route node.
   */
  constructor(node: Core.Node, record: Core.Record, route: Core.Node) {
    super(node, record.data.identity);
    this.#record = record;
    this.#route = route;
  }

  /**
   * Determines whether or not the member has a route.
   */
  get empty(): boolean {
    return this.#route.fragment === this.fragment;
  }

  /**
   * Get whether or not the member is dynamic.
   */
  get dynamic(): boolean {
    return this.#record.data.dynamic;
  }

  /**
   * Get the member route.
   */
  get route(): Core.Node {
    return this.#route;
  }
}
