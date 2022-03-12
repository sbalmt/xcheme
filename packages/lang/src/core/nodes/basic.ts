import * as Core from '@xcheme/core';

import * as Parser from '../../parser';

/**
 * Basic node.
 */
export class Node extends Core.Node {
  /**
   * Default constructor.
   * @param node Original node.
   */
  constructor(node: Core.Node) {
    super(node.fragment, node.value, node.table);
    this.set(Core.Nodes.Left, node.left);
    this.set(Core.Nodes.Right, node.right);
    this.set(Core.Nodes.Next, node.next);
  }

  /**
   * Get the node value.
   */
  get value(): Parser.Nodes {
    return super.value as Parser.Nodes;
  }
}
