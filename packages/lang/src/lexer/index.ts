import * as Core from '@xcheme/core';

import * as Types from '../core/types';

import { Errors } from '../core/errors';
import { Program } from './program';

export { Tokens } from './tokens';

/**
 * Consume the given source.
 * @param source Data source.
 * @returns Returns true when the source was consumed, otherwise returns false.
 */
export const consume = (source: Types.Source): boolean => {
  return Program.consume(source);
};

/**
 * Consume the specified text and produce a list of tokens in the given context.
 * @param text Input text.
 * @param context Input context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export const consumeText = (text: string, context: Types.Context): boolean => {
  const source = new Core.TextSource<Types.Metadata>(text, context);
  if (!Program.consume(source)) {
    context.addError(source.fragment, Errors.UNEXPECTED_TOKEN);
    return false;
  }
  return true;
};
