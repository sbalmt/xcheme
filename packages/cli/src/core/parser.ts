import * as Core from '@xcheme/core';
import * as Lang from '@xcheme/lang';

import * as Console from './console';
import * as Symbols from './symbols';
import * as Nodes from './nodes';

/**
 * Parse the given input tokens into the specified consumption context.
 * @param parser Main parser pattern.
 * @param tokens Input tokens.
 * @param context Consumption context.
 * @param symbols Determines whether or not the debug mode is active.
 * @param nodes Determines whether or not the debug mode is active.
 * @returns Returns true in case of success, false otherwise.
 */
export const consume = (
  parser: Lang.Types.Pattern,
  tokens: Lang.Types.TokenList,
  context: Lang.Types.Context,
  symbols: boolean,
  nodes: boolean
): boolean => {
  const source = new Core.TokenSource<Lang.Types.Metadata>(tokens, context);
  Console.printLine('Parsing...');
  if (!parser.consume(source)) {
    const fragment = tokens.at(source.longestState.offset)?.fragment ?? source.fragment;
    context.errors.emplace(fragment, Lang.Errors.UNEXPECTED_SYNTAX);
  } else {
    Console.clearLine();
  }
  if (symbols) {
    Symbols.print(context.table);
  }
  if (nodes) {
    Nodes.print(context.node);
  }
  return !context.errors.length;
};
