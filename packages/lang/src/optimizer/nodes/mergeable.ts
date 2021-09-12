import * as Core from '@xcheme/core';

import * as Parser from '../../parser';

import * as Basic from './basic';

/**
 * Mergeable node.
 */
export class Node extends Basic.Node {
  /**
   * Sequence type.
   */
  #type: Parser.Nodes;

  /**
   * Get all the mergeable nodes from the specified node in a sequence.
   * @param node Input node.
   * @returns Returns an array containing the mergeable sequence.
   */
  #getNodes(node: Core.Node): Core.Node[] {
    if (this.value === node.value) {
      return [...this.#getNodes(node.left!), ...this.#getNodes(node.right!)];
    }
    return [node];
  }

  /**
   * Default constructor.
   * @param node Original node.
   * @param type Sequence type.
   */
  constructor(node: Core.Node, type: Parser.Nodes) {
    super(node);
    this.#type = type;
  }

  /**
   * Get the sequence type.
   */
  get type(): Parser.Nodes {
    return this.#type;
  }

  /**
   * Get the node sequence.
   */
  get sequence(): Core.Node[] {
    return this.#getNodes(this);
  }
}
