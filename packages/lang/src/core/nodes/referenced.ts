import * as Core from '@xcheme/core';

import * as Identified from './identified';

/**
 * Referenced node.
 */
export class Node extends Identified.Node {
  /**
   * Default constructor.
   * @param node Original node.
   * @param identity Node identity.
   */
  constructor(node: Core.Node, identity: number) {
    super(node, identity);
  }
}
