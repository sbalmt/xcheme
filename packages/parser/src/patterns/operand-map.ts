import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

import { Nodes } from '../nodes';
import { Symbols } from '../symbols';
import { Arguments } from './arguments';

import { getDirectiveExpression } from './expression-directive';

/**
 * Get a new map member list for the given expression.
 * @param expression Expression pattern.
 * @returns Returns the generated pattern.
 */
const getMapMemberList = <T extends Core.Types>(expression: Core.Pattern<T>): Core.Pattern<T> => {
  const pattern: Core.Pattern<T> = new Core.ExpectFlowPattern(
    new Core.AppendNodePattern(
      Nodes.MapMember,
      Core.NodeDirection.Right,
      Core.NodeDirection.Next,
      new Core.ChooseFlowPattern(
        new Core.ExpectFlowPattern(
          Arguments,
          new Core.ChooseFlowPattern(
            getDirectiveExpression(Symbols.MapMember, void 0, expression),
            new Core.PlaceNodePattern(Core.NodeDirection.Right, expression)
          )
        ),
        getDirectiveExpression(Symbols.MapMember, void 0, expression),
        expression
      )
    ),
    new Core.OptFlowPattern(new Core.ExpectUnitPattern(Lexer.Tokens.Comma), new Core.RunFlowPattern(() => pattern))
  );
  return pattern;
};

/**
 * Get a new map operand pattern for the given expression.
 * @param expression Expression pattern.
 * @returns Returns the generated pattern.
 */
export const getMapOperand = <T extends Core.Types>(expression: Core.Pattern<T>): Core.Pattern<T> =>
  new Core.ScopeSymbolPattern(
    new Core.ExpectUnitPattern(Lexer.Tokens.Map),
    new Core.AppendNodePattern(
      Nodes.Map,
      Core.NodeDirection.Right,
      Core.NodeDirection.Right,
      new Core.ExpectFlowPattern(
        new Core.ExpectUnitPattern(Lexer.Tokens.OpenBraces),
        new Core.OptFlowPattern(getMapMemberList(expression)),
        new Core.ExpectUnitPattern(Lexer.Tokens.CloseBraces)
      )
    )
  );
