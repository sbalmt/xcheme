import * as Core from '@xcheme/core';
import * as Lexer from '@xcheme/lexer';

import { Nodes } from '../nodes';
import { Arguments } from './arguments';
import { RangeOperand } from './operand-range';
import { ReferenceOperand } from './operand-reference';
import { GeneralOperands } from './operand-general';

import { getUnaryExpression } from './expression-unary';
import { getBinaryExpression } from './expression-binary';
import { getGroupOperand } from './operand-group';
import { getMapOperand } from './operand-map';

/**
 * Get a direction prefix pattern for the given parameters.
 * @param expression Expression pattern.
 * @param ready Ready route value.
 * @param left Left route value.
 * @param right Right route value.
 * @param next Next route value.
 * @returns Returns the generated pattern.
 */
const getDirectionPrefix = <T extends Core.Types>(
  expression: Core.Pattern<T>,
  ready: Nodes,
  left: Nodes,
  right: Nodes,
  next: Nodes
): Core.Pattern<T> =>
  new Core.ExpectFlowPattern(
    new Core.OptFlowPattern(expression),
    new Core.UseValuePattern(
      ready,
      new Core.OptFlowPattern(
        new Core.MapFlowPattern(
          new Core.SetValueRoute(left, Lexer.Tokens.Left),
          new Core.SetValueRoute(right, Lexer.Tokens.Right),
          new Core.SetValueRoute(next, Lexer.Tokens.Next)
        )
      )
    )
  );

/**
 * Left-Append operator pattern.
 */
const LeftAppendOperator = getDirectionPrefix(
  Arguments,
  Nodes.AppendLTR,
  Nodes.AppendLTL,
  Nodes.AppendLTR,
  Nodes.AppendLTN
);

/**
 * Right-Append operator pattern.
 */
const RightAppendOperator = getDirectionPrefix(
  Arguments,
  Nodes.AppendRTR,
  Nodes.AppendRTL,
  Nodes.AppendRTR,
  Nodes.AppendRTN
);

/**
 * Next-Append operator pattern.
 */
const NextAppendOperator = getDirectionPrefix(
  Arguments,
  Nodes.AppendNTR,
  Nodes.AppendNTL,
  Nodes.AppendNTR,
  Nodes.AppendNTN
);

/**
 * Left-Prepend operator patten.
 */
const LeftPrependOperator = getDirectionPrefix(
  Arguments,
  Nodes.PrependLTR,
  Nodes.PrependLTL,
  Nodes.PrependLTR,
  Nodes.PrependLTN
);

/**
 * Right-Prepend operator patten.
 */
const RightPrependOperator = getDirectionPrefix(
  Arguments,
  Nodes.PrependRTR,
  Nodes.PrependRTL,
  Nodes.PrependRTR,
  Nodes.PrependRTN
);

/**
 * Next-Prepend operator patten.
 */
const NextPrependOperator = getDirectionPrefix(
  Arguments,
  Nodes.PrependNTR,
  Nodes.PrependNTL,
  Nodes.PrependNTR,
  Nodes.PrependNTN
);

/**
 * Unary operators pattern.
 */
const UnaryOperators = new Core.MapFlowPattern(
  new Core.SetValueRoute(Nodes.Not, Lexer.Tokens.Not),
  new Core.SetValueRoute(Nodes.Opt, Lexer.Tokens.Opt),
  new Core.SetValueRoute(Nodes.Repeat, Lexer.Tokens.Repeat),
  new Core.SetValueRoute(Nodes.PlaceRight, Lexer.Tokens.Place),
  new Core.SetValueRoute(Nodes.PlaceLeft, Lexer.Tokens.Place, Lexer.Tokens.Left),
  new Core.SetValueRoute(Nodes.PlaceRight, Lexer.Tokens.Place, Lexer.Tokens.Right),
  new Core.SetValueRoute(Nodes.PlaceNext, Lexer.Tokens.Place, Lexer.Tokens.Next),
  new Core.FlowRoute(LeftAppendOperator, Lexer.Tokens.Left, Lexer.Tokens.Append),
  new Core.FlowRoute(RightAppendOperator, Lexer.Tokens.Right, Lexer.Tokens.Append),
  new Core.FlowRoute(RightAppendOperator, Lexer.Tokens.Append),
  new Core.FlowRoute(NextAppendOperator, Lexer.Tokens.Next, Lexer.Tokens.Append),
  new Core.FlowRoute(LeftPrependOperator, Lexer.Tokens.Left, Lexer.Tokens.Prepend),
  new Core.FlowRoute(RightPrependOperator, Lexer.Tokens.Right, Lexer.Tokens.Prepend),
  new Core.FlowRoute(RightPrependOperator, Lexer.Tokens.Prepend),
  new Core.FlowRoute(NextPrependOperator, Lexer.Tokens.Next, Lexer.Tokens.Prepend),
  new Core.SetValueRoute(Nodes.Pivot, new Core.OptFlowPattern(Arguments), Lexer.Tokens.Pivot),
  new Core.SetValueRoute(Nodes.Symbol, new Core.OptFlowPattern(Arguments), Lexer.Tokens.Symbol),
  new Core.SetValueRoute(Nodes.Scope, Lexer.Tokens.Scope),
  new Core.SetValueRoute(Nodes.Error, Arguments, Lexer.Tokens.Error),
  new Core.SetValueRoute(Nodes.Has, Arguments, Lexer.Tokens.Has),
  new Core.SetValueRoute(Nodes.Set, Arguments, Lexer.Tokens.Set),
  new Core.SetValueRoute(Nodes.Uncase, Lexer.Tokens.Uncase),
  new Core.SetValueRoute(Nodes.Peek, Lexer.Tokens.Peek)
);

/**
 * Condition expression pattern.
 */
const ConditionExpression = new Core.OptFlowPattern(
  new Core.PivotNodePattern(
    Nodes.Then,
    Core.NodeDirection.Right,
    Core.NodeDirection.Left,
    new Core.ExpectUnitPattern(Lexer.Tokens.Then),
    new Core.RunFlowPattern(() => Expression),
    new Core.OptFlowPattern(
      new Core.PivotNodePattern(
        Nodes.Else,
        Core.NodeDirection.Right,
        Core.NodeDirection.Left,
        new Core.ExpectUnitPattern(Lexer.Tokens.Else),
        new Core.RunFlowPattern(() => Expression)
      )
    )
  )
);

/**
 * Expression pattern.
 */
export const Expression: Core.Pattern<Core.Types> = new Core.ExpectFlowPattern(
  getBinaryExpression(
    new Core.SetValuePattern(Nodes.Or, new Core.ChooseUnitPattern(Lexer.Tokens.Or, Lexer.Tokens.VerticalBar)),
    getBinaryExpression(
      new Core.SetValuePattern(Nodes.And, new Core.ChooseUnitPattern(Lexer.Tokens.And, Lexer.Tokens.Ampersand)),
      getUnaryExpression(
        UnaryOperators,
        new Core.PlaceNodePattern(
          Core.NodeDirection.Right,
          getBinaryExpression(
            new Core.SetValuePattern(Nodes.Access, new Core.ExpectUnitPattern(Lexer.Tokens.Period)),
            new Core.ChooseFlowPattern(
              new Core.RunFlowPattern(() => getGroupOperand(Expression)),
              new Core.RunFlowPattern(() => getMapOperand(Expression)),
              RangeOperand,
              ReferenceOperand,
              GeneralOperands
            )
          )
        )
      )
    )
  ),
  ConditionExpression
);
