import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

/**
 * Get a new group operand pattern for the given expression.
 * @param expression Expression pattern.
 * @returns Returns the generated pattern.
 */
export const getGroupOperand = <T extends Core.Types>(expression: Core.Pattern<T>): Core.Pattern<T> =>
  new Core.PlaceNodePattern(
    Core.NodeDirection.Right,
    new Core.ExpectFlowPattern(
      new Core.ExpectUnitPattern(Lexer.Tokens.OpenParenthesis),
      expression,
      new Core.ExpectUnitPattern(Lexer.Tokens.CloseParenthesis)
    )
  );
