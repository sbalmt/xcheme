import * as Lang from '@xcheme/lang';

import * as Fragment from './fragment';

import { Logging } from './console';

/**
 * Print a list for the given tokens.
 * @param tokens List of tokens.
 */
export const print = (tokens: Lang.Types.TokenList): void => {
  Logging.printLine('Tokens:\n');
  Logging.printLine('          Code Fragment');
  for (const token of tokens) {
    const location = Fragment.getLocation(token.fragment);
    const fragment = Fragment.getMessage(token.fragment);
    const value = token.value.toString().padStart(4, '0');
    Logging.printLine(`${location} ${value} "${fragment}"`);
  }
  Logging.printLine('');
};
