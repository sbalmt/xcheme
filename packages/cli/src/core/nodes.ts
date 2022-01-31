import * as Core from '@xcheme/core';

import * as Console from './console';
import * as Fragment from './fragment';

/**
 * Get the node indent based on the specified state.
 * @param state Determines whether or not there are next nodes.
 * @returns Returns the node indent.
 */
const getIndent = (state: boolean): string => {
  return state ? '│  ' : '   ';
};

/**
 * Get the node prefix based on the specified state.
 * @param state Determines whether or not there are next nodes.
 * @returns Returns the node prefix.
 */
const getPrefix = (state: boolean): string => {
  return state ? '├─ ' : '└─ ';
};

/**
 * Get the node name based on the given direction.
 * @param direction Node direction.
 * @returns Returns the node name.
 */
const getName = (direction: Core.Nodes): string => {
  switch (direction) {
    case Core.Nodes.Left:
      return 'L';
    case Core.Nodes.Right:
      return 'R';
    case Core.Nodes.Next:
      return 'N';
  }
};

/**
 * Print recursively all the child nodes in the given parent node.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param prefix Node prefix.
 * @param indent Node ident.
 */
const printTree = (direction: Core.Nodes, parent: Core.Node, prefix: string, indent: string): void => {
  const node = parent.getChild(direction)!;
  const fragment = Fragment.getMessage(node.fragment);
  const location = Fragment.getLocation(node.fragment);
  const code = node.value.toString();
  const name = getName(direction);
  Console.printLine(` ${location} ${prefix}${name} ${code} "${fragment}"`);
  if (node.left) {
    const state = node.right !== void 0 || node.next !== void 0;
    printTree(Core.Nodes.Left, node, indent + getPrefix(state), indent + getIndent(state));
  }
  if (node.right) {
    const state = node.next !== void 0;
    printTree(Core.Nodes.Right, node, indent + getPrefix(state), indent + getIndent(state));
  }
  if (node.next) {
    printTree(Core.Nodes.Next, node, indent, indent);
  }
};

/**
 * Print the corresponding tree for the given node.
 * @param node Input node.
 */
export const print = (node: Core.Node): void => {
  if (node.next) {
    Console.printLine('Nodes:\n');
    printTree(Core.Nodes.Next, node, '', '');
    Console.printLine('');
  }
};
