import * as Core from '@xcheme/core';

import * as Console from './console';
import * as Fragment from './fragment';

/**
 * Print all the symbols in the given table.
 * @param table Symbol table.
 * @param deep Input depth.
 */
const printTable = (table: Core.Table, deep: number): void => {
  const scope = (deep > 0 ? 'Inner' : 'Global').padEnd(7, ' ');
  const padding = deep > 0 ? '   '.repeat(deep - 1) : '';
  const level = deep.toString().padStart(3, ' ');
  let index = 1;
  for (const record of table) {
    const value = record.value;
    const identifier = record.fragment.data;
    const location = Fragment.getLocation(record.fragment);
    const connector = deep > 0 ? (index === table.length ? ' └─ ' : ' ├─ ') : ' ';
    Console.printLine(` ${location} ${scope} ${level} ${value} ${padding}${connector}${identifier}`);
    if (record.link) {
      printTable(record.link, deep + 1);
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
  printTable(table, 0);
  Console.printLine('');
};
