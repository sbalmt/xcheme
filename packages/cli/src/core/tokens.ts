import * as Lang from '@xcheme/lang';

import * as Fragment from './fragment';

import { Output } from './console';

/**
 * Print a list for the given tokens.
 * @param tokens List of tokens.
 */
export const print = (tokens: Lang.Types.TokenList): void => {
  Output.printLine('Tokens:\n');
  Output.printLine('          Code Fragment');
  for (const token of tokens) {
    const location = Fragment.getLocation(token.fragment);
    const fragment = Fragment.getMessage(token.fragment);
    const value = token.value.toString().padStart(4, '0');
    Output.printLine(`${location} ${value} "${fragment}"`);
  }
  Output.printLine('');
};
