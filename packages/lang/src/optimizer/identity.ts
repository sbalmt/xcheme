import * as Core from '@xcheme/core';

/**
 * Resolve the current identity for the given node.
 * @param node Input node.
 * @returns Returns the resolved identity number or NaN when the node doesn't have an identity.
 */
export const resolve = (node: Core.Node): number => {
  const value = node.fragment.data;
  if (value === 'auto') {
    return Core.BaseSource.Output;
  }
  const identity = parseInt(value);
  if (!isNaN(identity)) {
    return identity;
  }
  return NaN;
};

/**
 * Consume the current identity for the given node.
 * @param node Input node.
 * @returns Returns the resolved identity number or NaN when the node doesn't have an identity.
 */
export const consume = (node: Core.Node): number => {
  if (node.left) {
    return resolve(node.left);
  }
  return NaN;
};
