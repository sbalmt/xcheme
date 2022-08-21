import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

import { Nodes } from '../nodes';
import { Symbols } from '../symbols';

/**
 * Get a new directive pattern for the given parameters.
 * @param symbol Symbol value.
 * @param identity Identity pattern.
 * @param expression Expression pattern.
 * @returns Returns the generated pattern.
 */
export const getDirectiveExpression = <T extends Core.Types>(
  symbol: Symbols,
  identity: Core.Pattern<T> | undefined,
  expression: Core.Pattern<T>
): Core.Pattern<T> =>
  new Core.ExpectFlowPattern(
    identity ? new Core.OptFlowPattern(identity) : new Core.StaticFlowPattern(true),
    new Core.EmitSymbolPattern(
      symbol,
      new Core.PivotNodePattern(
        Nodes.Identifier,
        Core.Nodes.Right,
        Core.Nodes.Left,
        new Core.ExpectUnitPattern(Lexer.Tokens.Identifier),
        new Core.PeekFlowPattern(new Core.ExpectUnitPattern(Lexer.Tokens.As))
      ),
      new Core.ExpectUnitPattern(Lexer.Tokens.As),
      new Core.PlaceNodePattern(Core.Nodes.Right, expression)
    )
  );
