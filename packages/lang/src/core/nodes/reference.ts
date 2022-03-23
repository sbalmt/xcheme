import * as Core from '@xcheme/core';

import Identity from './identity';

/**
 * Optimized reference node.
 */
export default class Node extends Identity {
  /**
   * Default constructor.
   * @param node Original node.
   * @param identity Node identity.
   */
  constructor(node: Core.Node, identity: number) {
    super(node, identity);
  }
}
