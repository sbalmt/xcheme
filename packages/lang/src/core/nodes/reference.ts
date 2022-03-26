import * as Types from '../types';

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
  constructor(node: Types.Node, identity: number) {
    super(node, identity);
  }
}
