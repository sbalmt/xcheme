import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';

import * as Console from './console';
import * as Symbols from './symbols';
import * as Nodes from './nodes';

/**
 * Parse the given input tokens.
 * @param tokens Input tokens.
 * @param context Consumption context.
 * @param symbols Determines whether or not the debug mode is active.
 * @param nodes Determines whether or not the debug mode is active.
 * @returns Returns true in case of success, false otherwise.
 */
export const parse = (
  program: Core.Pattern,
  tokens: Core.Token[],
  context: Core.Context,
  symbols: boolean,
  nodes: boolean
): boolean => {
  const source = new Core.TokenSource(tokens, context);
  Console.printLine('Parsing...');
  if (!program.consume(source)) {
    const fragment = tokens[source.longestState.offset]?.fragment ?? source.fragment;
    context.addError(fragment, Lang.Errors.UNEXPECTED_SYNTAX);
  } else {
    Console.clearLine();
    if (symbols) {
      Symbols.print(context.node);
    }
    if (nodes) {
      Nodes.print(context.node);
    }
  }
  return context.errors.length === 0;
};
