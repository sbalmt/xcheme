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
   * Sequence nodes.
   */
  #sequence: Core.Node[];

  /**
   * Get all the mergeable nodes from the specified node in a sequence.
   * @param node Input node.
   * @returns Returns an array containing the sequence.
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
   * @param type Node sequence type.
   */
  constructor(node: Core.Node, type: Parser.Nodes) {
    super(node);
    this.#type = type;
    this.#sequence = this.#getNodes(node);
    this.setChild(Core.Nodes.Left, void 0);
    this.setChild(Core.Nodes.Right, void 0);
    this.setChild(Core.Nodes.Next, void 0);
  }

  /**
   * Get the node sequence type.
   */
  get type(): Parser.Nodes {
    return this.#type;
  }

  /**
   * Get the nodes sequence.
   */
  get sequence(): Core.Node[] {
    return this.#sequence;
  }
}
