import * as Lang from '@xcheme/lang';

import * as Console from './console';
import * as Fragment from './fragment';

/**
 * Print a list for the given tokens.
 * @param tokens List of tokens.
 */
export const print = (tokens: Lang.Types.TokenList): void => {
  Console.printLine('Tokens:\n');
  Console.printLine('          Code Fragment');
  for (const token of tokens) {
    const location = Fragment.getLocation(token.fragment);
    const fragment = Fragment.getMessage(token.fragment);
    const value = token.value.toString().padStart(4, '0');
    Console.printLine(`${location} ${value} "${fragment}"`);
  }
  Console.printLine('');
};
