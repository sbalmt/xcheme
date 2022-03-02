import * as Core from '@xcheme/core';

/**
 * Resolve the node identity from the given node.
 * @param node Input node.
 * @returns Returns the node identity or undefined when identity doesn't exists or it's invalid.
 */
export const resolve = (node: Core.Node): number | undefined => {
  if (node.left) {
    const value = node.left.fragment.data;
    if (value === 'auto') {
      return Core.BaseSource.Output;
    }
    const identity = parseInt(value);
    if (!isNaN(identity)) {
      return identity;
    }
  }
  return void 0;
};
