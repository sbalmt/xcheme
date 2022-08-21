import * as Core from '@xcheme/core';

import { Parser } from './parser';
import { Errors } from './errors';

export { Nodes } from './nodes';
export { Symbols } from './symbols';
export { Errors } from './errors';

/**
 * Consume the given source and produce an AST.
 * @param source Data source.
 * @returns Returns true when the source was consumed without errors, otherwise returns false.
 */
export const consume = <T extends Core.Types>(source: Core.Source<T>): boolean => {
  return Parser.consume(source);
};

/**
 * Consume the specified tokens and produce an AST for the given context.
 * @param tokens Input tokens.
 * @param context Output context.
 * @returns Returns true when the consumption was successful, false otherwise.
 */
export const consumeTokens = <T extends Core.Types>(tokens: Core.TokenList<T>, context: Core.Context<T>): boolean => {
  const source = new Core.TokenSource<T>(tokens, context);
  if (!consume(source)) {
    const fragment = tokens.at(source.longestState.offset)?.fragment ?? source.fragment;
    context.errors.emplace(fragment, Errors.UNEXPECTED_SYNTAX);
    return false;
  }
  return true;
};
