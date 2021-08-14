import * as Core from '@xcheme/core';

import { Errors } from '../core/errors';
import { Program } from './program';

export { Symbols } from './symbols';
export { Nodes } from './nodes';

/**
 * Consume the specified tokens and produce an AST for updating the given context.
 * @param tokens Input tokens.
 * @param context Output context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export const consumeTokens = (tokens: Core.Token[], context: Core.Context): boolean => {
  const source = new Core.TokenSource(tokens, context);
  if (!Program.consume(source)) {
    const fragment = tokens[source.longestState.offset]?.fragment ?? source.fragment;
    context.errors.push(new Core.Error(fragment, Errors.UNEXPECTED_SYNTAX));
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
