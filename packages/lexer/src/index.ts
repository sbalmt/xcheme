import * as Core from '@xcheme/core';

import { Lexer } from './lexer';
import { Errors } from './errors';

export { Tokens } from './tokens';
export { Errors } from './errors';

/**
 * Consume the given source and produce a list of tokens.
 * @param source Data source.
 * @returns Returns true when the source was consumed without errors, otherwise returns false.
 */
export const consume = <T extends Core.Metadata.Types>(source: Core.Source<T>): boolean => {
  return Lexer.consume(source);
};

/**
 * Consume the specified text and produce a list of tokens for the given context.
 * @param text Input text.
 * @param context Input context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export const consumeText = <T extends Core.Metadata.Types>(text: string, context: Core.Context<T>): boolean => {
  const source = new Core.TextSource<T>(text, context);
  if (!consume(source)) {
    context.errors.emplace(source.fragment, Errors.UNEXPECTED_TOKEN);
    return false;
  }
  return true;
};
