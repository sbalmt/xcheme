import * as Core from '@xcheme/core';

import * as Console from './console';
import * as Fragment from './fragment';

/**
 * Get the formatted record code.
 * @param record Input record.
 * @returns Returns the formatted record code.
 */
const getCode = (record: Core.Record): string => {
  return record.value.toString();
};

/**
 * Get the formatted scope name.
 * @param table Input table.
 * @returns Returns the formatted scope name.
 */
const getScope = (table: Core.Table): string => {
  return (table.parent ? 'Inner' : 'Global').padEnd(7, ' ');
};

/**
 * Get the formatted level.
 * @param table Input table.
 * @returns Return the formatted level.
 */
const getLevel = (table: Core.Table): string => {
  let total = 1;
  while ((table = table.parent!)) {
    total++;
  }
  return total.toString().padStart(3, ' ');
};

/**
 * Print recursively all the symbols in the given node and its children.
 * @param parent Parent node.
 * @param node Current node.
 * @param prefix Current prefix.
 */
const printTable = (node: Core.Node, cache: Set<Core.Table>): void => {
  while ((node = node.next!)) {
    if (!cache.has(node.table)) {
      cache.add(node.table);
      const scope = getScope(node.table);
      const level = getLevel(node.table);
      for (const key of node.table.keys) {
        const record = node.table.getRecord(key)!;
        const location = Fragment.getLocation(record.fragment);
        Console.printLine(` ${location} ${scope} ${level} ${getCode(record)} ${key}`);
      }
    }
    if (node.left) {
      printTable(node.left, cache);
    }
    if (node.right) {
      printTable(node.right, cache);
    }
    if (node.next) {
      printTable(node.next, cache);
    }
  }
};

/**
 * Print a symbol table for the specified node.
 * @param node Input node.
 */
export const print = (node: Core.Node): void => {
  Console.printLine('Symbols:\n');
  printTable(node, new Set());
  Console.printLine('');
};
