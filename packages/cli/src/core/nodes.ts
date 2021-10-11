import * as Core from '@xcheme/core';

import * as Console from './console';
import * as Fragment from './fragment';

/**
 * Get the prefix for the given node.
 * @param dir Node direction.
 * @param node Input node.
 * @param inner Determines whether or not this is an inner node.
 * @returns Returns the corresponding entry.
 */
const getPrefix = (dir: string, node: Core.Node, inner: boolean): string => {
  if (
    (dir === 'L' && (node.right || (node.next && !inner))) ||
    (dir === 'R' && node.next && inner) ||
    (dir === 'N' && node.next?.next && !inner)
  ) {
    return '├─ ';
  }
  return '└─ ';
};

/**
 * Get the indentation for the given tree.
 * @param dir Tree direction.
 * @param node Tree node.
 * @param inner Determines whether or not this is an inner tree.
 * @returns Returns the corresponding indentation.
 */
const getIndent = (dir: string, node: Core.Node, inner: boolean): string => {
  if (
    (dir === 'L' && (node.right || (node.next && !inner))) ||
    (dir === 'R' && node.next && inner) ||
    (dir === 'N' && node.next?.next && !inner)
  ) {
    return '│  ';
  }
  return '   ';
};

/**
 * Print recursively the specified node and all its children in a tree format.
 * @param dir Node direction.
 * @param parent Parent node.
 * @param node Current node.
 * @param prefix Current prefix.
 * @param inner Determines whether or not this is an inner tree.
 */
const printTree = (dir: string, parent: Core.Node | undefined, node: Core.Node, prefix: string, inner: boolean): void => {
  const fragment = Fragment.getMessage(node.fragment);
  const location = Fragment.getLocation(node.fragment);
  const entry = parent ? getPrefix(dir, parent, inner) : '';
  const code = node.value.toString();
  Console.printLine(` ${location} ${prefix}${entry}${dir} ${code} "${fragment}"`);
  if (parent) {
    prefix += getIndent(dir, parent, inner);
  }
  if (node.left) {
    printTree('L', node, node.left, prefix, true);
  }
  if (node.right) {
    printTree('R', node, node.right, prefix, true);
  }
  if (node.next && inner) {
    printList(node, node, prefix);
  }
};

/**
 * Print recursively the specified node and all its children in a list format.
 * @param parent Parent node.
 * @param node Current node.
 * @param prefix Current prefix.
 */
const printList = (parent: Core.Node | undefined, node: Core.Node, prefix: string): void => {
  while ((node = node.next!)) {
    printTree('N', parent, node, prefix, false);
    if (parent) {
      parent = node;
    }
  }
};

/**
 * Print a tree for the specified node.
 * @param node Input node.
 */
export const print = (node: Core.Node): void => {
  Console.printLine('Nodes:\n');
  printList(void 0, node, '');
  Console.printLine('');
};
