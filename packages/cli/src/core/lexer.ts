import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';

import * as Console from './console';
import * as Tokens from './tokens';

/**
 * Tokenize the given input source into the specified consumption context.
 * @param lexer Main lexer pattern.
 * @param text Input text.
 * @param context Consumption context.
 * @param tokens Determines whether or not the debug mode is active for tokens.
 * @returns Returns true in case of success, false otherwise.
 */
export const consume = (
  lexer: Lang.Types.Pattern,
  text: string,
  context: Lang.Types.Context,
  tokens: boolean
): boolean => {
  const source = new Core.TextSource<Lang.Types.Metadata>(text, context);
  Console.printLine('Tokenizing...');
  if (!lexer.consume(source)) {
    context.logs.emplace(Core.LogType.ERROR, source.fragment, Lang.Errors.UNEXPECTED_TOKEN);
  } else {
    Console.clearLine();
  }
  if (tokens) {
    Tokens.print(context.tokens);
  }
  return !context.logs.length;
};
