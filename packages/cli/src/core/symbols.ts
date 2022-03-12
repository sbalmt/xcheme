import * as Core from '@xcheme/core';

import * as Console from './console';
import * as Fragment from './fragment';

/**
 * Get the depth indentation string.
 * @param depth Depth states.
 * @returns Return the depth indentation string.
 */
const getIndent = (depth: boolean[]): string => {
  const padding = [];
  for (let index = 1; index < depth.length; ++index) {
    padding.push(depth[index] ? '│  ' : '   ');
  }
  return padding.join('');
};

/**
 * Print all the symbols in the given table.
 * @param table Symbol table.
 * @param depth Depth states.
 */
const printTable = (table: Core.Table, ...depth: boolean[]): void => {
  const padding = getIndent(depth);
  let index = 1;
  for (const record of table) {
    const ending = index === table.length;
    const location = Fragment.getLocation(record.fragment);
    const value = record.value.toString().padStart(4, '0');
    const connector = depth.length > 0 ? (ending ? '└─ ' : '├─ ') : '';
    const identifier = record.fragment.data;
    Console.printLine(`${location} ${value} ${padding}${connector}${identifier}`);
    if (record.link) {
      printTable(record.link, ...depth, !ending);
    }
    index++;
  }
};

/**
 * Print all the symbol for the given symbol table.
 * @param table Symbol table.
 */
export const print = (table: Core.Table): void => {
  Console.printLine('Symbols:\n');
  Console.printLine('          Code Identifier');
  printTable(table);
  Console.printLine('');
};
