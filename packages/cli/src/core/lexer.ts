import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';

import * as Console from './console';
import * as Tokens from './tokens';

/**
 * Tokenize the given input source.
 * @param text Input text.
 * @param context Consumption context.
 * @param tokens Determines whether or not the debug mode is active for tokens.
 * @returns Returns true in case of success, false otherwise.
 */
export const tokenize = (program: Core.Pattern, text: string, context: Core.Context, tokens: boolean): boolean => {
  const source = new Core.TextSource(text, context);
  Console.printLine('Tokenizing...');
  if (!program.consume(source)) {
    context.addError(source.fragment, Lang.Errors.UNEXPECTED_TOKEN);
  } else {
    Console.clearLine();
  }
  if (tokens) {
    Tokens.print(context.tokens);
  }
  return context.errors.length === 0;
};
