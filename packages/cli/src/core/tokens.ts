import * as Core from '@xcheme/core';

import * as Console from './console';
import * as Fragment from './fragment';

/**
 * Get the formatted token code.
 * @param token Input token.
 * @returns Returns the formatted token code.
 */
const getCode = (token: Core.Token): string => {
  return `${token.value.toString().padStart(4, '0')}`;
};

/**
 * Print a list for the given tokens.
 * @param tokens Input tokens.
 */
export const print = (tokens: Core.Token[]): void => {
  Console.printLine('Tokens:');
  for (const token of tokens) {
    const location = Fragment.getLocation(token.fragment);
    const message = Fragment.getMessage(token.fragment);
    Console.printLine(` ${location} ${getCode(token)} "${message}"`);
  }
  Console.printLine('');
};
