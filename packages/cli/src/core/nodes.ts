import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';

import * as Console from './console';
import * as Fragment from './fragment';

/**
 * Get the node direction name based on the given direction value.
 * @param direction Direction value.
 * @returns Returns the direction name.
 */
const getDirection = (direction: Core.NodeDirection): string => {
  switch (direction) {
    case Core.NodeDirection.Left:
      return 'L';
    case Core.NodeDirection.Right:
      return 'R';
    case Core.NodeDirection.Next:
      return 'N';
  }
};

/**
 * Get the depth indentation string.
 * @param depth Depth states.
 * @returns Return the depth indentation string.
 */
const getPadding = (depth: boolean[]): string => {
  const padding = [];
  const length = depth.length - 1;
  for (let index = 0; index < length; ++index) {
    padding.push(depth[index] ? '│  ' : '   ');
  }
  return padding.join('');
};

/**
 * Print recursively all the child nodes in the given parent node.
 * @param direction Child node direction.
 * @param parent Parent node.
 * @param depth Depth states.
 */
const printTree = (direction: Core.NodeDirection, parent: Lang.Types.Node, ...depth: boolean[]): void => {
  const node = parent.get(direction)!;
  const padding = getPadding(depth);
  const children = depth.length > 0;
  const connected = children && depth[depth.length - 1];
  for (const current of node) {
    const name = getDirection(direction);
    const location = Fragment.getLocation(current.fragment);
    const fragment = Fragment.getMessage(current.fragment);
    const connector = children ? (direction === Core.NodeDirection.Next ? '   ' : connected ? '├─ ' : '└─ ') : '';
    const value = current.value.toString();
    Console.printLine(` ${location} ${padding}${connector}${name} ${value} "${fragment}"`);
    if (current.left) {
      printTree(Core.NodeDirection.Left, current, ...depth, current.right !== void 0 || current.next !== void 0);
    }
    if (current.right) {
      printTree(Core.NodeDirection.Right, current, ...depth, current.next !== void 0);
    }
    direction = Core.NodeDirection.Next;
  }
};

/**
 * Print the corresponding tree for the given node.
 * @param node Input node.
 */
export const print = (node: Lang.Types.Node): void => {
  if (node.next) {
    Console.printLine('Nodes:\n');
    printTree(Core.NodeDirection.Next, node);
    Console.printLine('');
  }
};
