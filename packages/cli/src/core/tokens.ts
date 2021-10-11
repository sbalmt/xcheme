import * as Core from '@xcheme/core';

import * as Console from './console';
import * as Fragment from './fragment';

/**
 * Print a list for the given tokens.
 * @param tokens Input tokens.
 */
export const print = (tokens: Core.Token[]): void => {
  Console.printLine('Tokens:');
  for (const token of tokens) {
    const location = Fragment.getLocation(token.fragment);
    const message = Fragment.getMessage(token.fragment);
    const code = token.value.toString().padStart(4, '0');
    Console.printLine(` ${location} ${code} "${message}"`);
  }
  Console.printLine('');
};
