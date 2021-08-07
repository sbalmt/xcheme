import * as Core from '@xcheme/core';

import { Errors } from '../core/errors';
import { Program } from './program';

export { Tokens } from './tokens';

/**
 * Consume the specified text and produce a list of tokens for updating the given context.
 * @param text Input text.
 * @param context Output context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export const consumeText = (text: string, context: Core.Context): boolean => {
  const source = new Core.TextSource(text, context);
  if (!Program.consume(source)) {
    context.errors.push(new Core.Error(source.fragment, Errors.UNEXPECTED_TOKEN));
    return false;
  }
  return true;
};

/**
 * Consume the given source.
 * @param source Data source.
 * @returns Returns true when the source was consumed, otherwise returns false.
 */
export const consume = (source: Core.BaseSource): boolean => {
  return Program.consume(source);
};
