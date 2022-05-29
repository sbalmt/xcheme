import * as Core from '@xcheme/core';

import * as Types from '../core/types';
import * as Lexer from '../lexer';

import UnaryExpression from './patterns/unary';
import BinaryExpression from './patterns/binary';
import DirectiveExpression from './patterns/directive';
import DirectionalExpression from './patterns/directional';

import { Symbols } from './symbols';
import { Nodes } from './nodes';

/**
 * Argument list pattern.
 */
const argumentList: Types.Pattern = new Core.ExpectFlowPattern(
  new Core.AppendNodePattern(
    Core.Source.Output,
    Core.Nodes.Right,
    Core.Nodes.Next,
    new Core.MapFlowPattern(
      new Core.SetValueRoute(Nodes.Identity, Lexer.Tokens.Auto),
      new Core.SetValueRoute(Nodes.Identity, Lexer.Tokens.Number),
      new Core.SetValueRoute(Nodes.Reference, Lexer.Tokens.Identifier)
    )
  ),
  new Core.OptFlowPattern(new Core.ExpectUnitPattern(Lexer.Tokens.Comma), new Core.RunFlowPattern(() => argumentList))
);

/**
 * Argument expression pattern.
 */
const argumentExpression = new Core.AppendNodePattern(
  Nodes.Arguments,
  Core.Nodes.Left,
  Core.Nodes.Left,
  new Core.ExpectFlowPattern(
    new Core.ExpectUnitPattern(Lexer.Tokens.OpenChevron),
    argumentList,
    new Core.ExpectUnitPattern(Lexer.Tokens.CloseChevron)
  )
);

/**
 * Left Append operator pattern.
 */
const leftAppendOperator = new DirectionalExpression(
  argumentExpression,
  Nodes.AppendLTR,
  Nodes.AppendLTL,
  Nodes.AppendLTR,
  Nodes.AppendLTN
);

/**
 * Right Append operator pattern.
 */
const rightAppendOperator = new DirectionalExpression(
  argumentExpression,
  Nodes.AppendRTR,
  Nodes.AppendRTL,
  Nodes.AppendRTR,
  Nodes.AppendRTN
);

/**
 * Next Append operator pattern.
 */
const nextAppendOperator = new DirectionalExpression(
  argumentExpression,
  Nodes.AppendNTR,
  Nodes.AppendNTL,
  Nodes.AppendNTR,
  Nodes.AppendNTN
);

/**
 * Left Prepend operator patten.
 */
const leftPrependOperator = new DirectionalExpression(
  argumentExpression,
  Nodes.PrependLTR,
  Nodes.PrependLTL,
  Nodes.PrependLTR,
  Nodes.PrependLTN
);

/**
 * Right Prepend operator patten.
 */
const rightPrependOperator = new DirectionalExpression(
  argumentExpression,
  Nodes.PrependRTR,
  Nodes.PrependRTL,
  Nodes.PrependRTR,
  Nodes.PrependRTN
);

/**
 * Next Prepend operator patten.
 */
const nextPrependOperator = new DirectionalExpression(
  argumentExpression,
  Nodes.PrependNTR,
  Nodes.PrependNTL,
  Nodes.PrependNTR,
  Nodes.PrependNTN
);

/**
 * Unary operators pattern.
 */
const unaryOperators = new Core.MapFlowPattern(
  new Core.SetValueRoute(Nodes.Not, Lexer.Tokens.Not),
  new Core.SetValueRoute(Nodes.Opt, Lexer.Tokens.Opt),
  new Core.SetValueRoute(Nodes.Repeat, Lexer.Tokens.Repeat),
  new Core.SetValueRoute(Nodes.PlaceRight, Lexer.Tokens.Place),
  new Core.SetValueRoute(Nodes.PlaceLeft, Lexer.Tokens.Place, Lexer.Tokens.Left),
  new Core.SetValueRoute(Nodes.PlaceRight, Lexer.Tokens.Place, Lexer.Tokens.Right),
  new Core.SetValueRoute(Nodes.PlaceNext, Lexer.Tokens.Place, Lexer.Tokens.Next),
  new Core.FlowRoute(leftAppendOperator, Lexer.Tokens.Left, Lexer.Tokens.Append),
  new Core.FlowRoute(rightAppendOperator, Lexer.Tokens.Right, Lexer.Tokens.Append),
  new Core.FlowRoute(rightAppendOperator, Lexer.Tokens.Append),
  new Core.FlowRoute(nextAppendOperator, Lexer.Tokens.Next, Lexer.Tokens.Append),
  new Core.FlowRoute(leftPrependOperator, Lexer.Tokens.Left, Lexer.Tokens.Prepend),
  new Core.FlowRoute(rightPrependOperator, Lexer.Tokens.Right, Lexer.Tokens.Prepend),
  new Core.FlowRoute(rightPrependOperator, Lexer.Tokens.Prepend),
  new Core.FlowRoute(nextPrependOperator, Lexer.Tokens.Next, Lexer.Tokens.Prepend),
  new Core.SetValueRoute(Nodes.Pivot, new Core.OptFlowPattern(argumentExpression), Lexer.Tokens.Pivot),
  new Core.SetValueRoute(Nodes.Symbol, new Core.OptFlowPattern(argumentExpression), Lexer.Tokens.Symbol),
  new Core.SetValueRoute(Nodes.Scope, Lexer.Tokens.Scope),
  new Core.SetValueRoute(Nodes.Error, argumentExpression, Lexer.Tokens.Error),
  new Core.SetValueRoute(Nodes.Has, argumentExpression, Lexer.Tokens.Has),
  new Core.SetValueRoute(Nodes.Set, argumentExpression, Lexer.Tokens.Set),
  new Core.SetValueRoute(Nodes.Uncase, Lexer.Tokens.Uncase),
  new Core.SetValueRoute(Nodes.Peek, Lexer.Tokens.Peek)
);

/**
 * Map member list pattern.
 */
const mapMemberList: Types.Pattern = new Core.ExpectFlowPattern(
  new Core.AppendNodePattern(
    Nodes.MapMember,
    Core.Nodes.Right,
    Core.Nodes.Next,
    new Core.ChooseFlowPattern(
      new Core.ExpectFlowPattern(
        argumentExpression,
        new Core.ChooseFlowPattern(
          new DirectiveExpression(Symbols.MapMember, void 0, new Core.RunFlowPattern(() => expression)),
          new Core.PlaceNodePattern(Core.Nodes.Right, new Core.RunFlowPattern(() => expression))
        )
      ),
      new DirectiveExpression(Symbols.MapMember, void 0, new Core.RunFlowPattern(() => expression)),
      new Core.RunFlowPattern(() => expression)
    )
  ),
  new Core.OptFlowPattern(new Core.ExpectUnitPattern(Lexer.Tokens.Comma), new Core.RunFlowPattern(() => mapMemberList))
);

/**
 * Map operand pattern.
 */
const mapOperand = new Core.ScopeSymbolPattern(
  new Core.ExpectUnitPattern(Lexer.Tokens.Map),
  new Core.AppendNodePattern(
    Nodes.Map,
    Core.Nodes.Right,
    Core.Nodes.Right,
    new Core.ExpectFlowPattern(
      new Core.ExpectUnitPattern(Lexer.Tokens.OpenBraces),
      new Core.OptFlowPattern(mapMemberList),
      new Core.ExpectUnitPattern(Lexer.Tokens.CloseBraces)
    )
  )
);

/**
 * Range operand pattern.
 */
const rangeOperand = new Core.PlaceNodePattern(
  Core.Nodes.Right,
  new Core.ExpectUnitPattern(Lexer.Tokens.From),
  new Core.AppendNodePattern(
    Nodes.String,
    Core.Nodes.Right,
    Core.Nodes.Right,
    new Core.ExpectUnitPattern(Lexer.Tokens.String)
  ),
  new Core.PivotNodePattern(
    Nodes.Range,
    Core.Nodes.Right,
    Core.Nodes.Left,
    new Core.ExpectUnitPattern(Lexer.Tokens.To),
    new Core.AppendNodePattern(
      Nodes.String,
      Core.Nodes.Right,
      Core.Nodes.Right,
      new Core.ExpectUnitPattern(Lexer.Tokens.String)
    )
  )
);

/**
 * Reference operand pattern.
 */
const referenceOperand = new Core.AppendNodePattern(
  Nodes.Reference,
  Core.Nodes.Right,
  Core.Nodes.Right,
  new Core.ExpectUnitPattern(Lexer.Tokens.Identifier),
  new Core.OptFlowPattern(argumentExpression)
);

/**
 * General operands pattern.
 */
const generalOperands = new Core.AppendNodePattern(
  Core.Source.Output,
  Core.Nodes.Right,
  Core.Nodes.Right,
  new Core.MapFlowPattern(
    new Core.SetValueRoute(Nodes.Any, Lexer.Tokens.Any),
    new Core.SetValueRoute(Nodes.Any, Lexer.Tokens.Asterisk),
    new Core.SetValueRoute(Nodes.String, Lexer.Tokens.String)
  )
);

/**
 * Group expression pattern.
 */
const groupExpression = new Core.PlaceNodePattern(
  Core.Nodes.Right,
  new Core.ExpectFlowPattern(
    new Core.ExpectUnitPattern(Lexer.Tokens.OpenParenthesis),
    new Core.RunFlowPattern(() => expression),
    new Core.ExpectUnitPattern(Lexer.Tokens.CloseParenthesis)
  )
);

/**
 * Condition expression pattern.
 */
const conditionExpression = new Core.OptFlowPattern(
  new Core.PivotNodePattern(
    Nodes.Then,
    Core.Nodes.Right,
    Core.Nodes.Left,
    new Core.ExpectUnitPattern(Lexer.Tokens.Then),
    new Core.RunFlowPattern(() => expression),
    new Core.OptFlowPattern(
      new Core.PivotNodePattern(
        Nodes.Else,
        Core.Nodes.Right,
        Core.Nodes.Left,
        new Core.ExpectUnitPattern(Lexer.Tokens.Else),
        new Core.RunFlowPattern(() => expression)
      )
    )
  )
);

/**
 * Expression pattern.
 */
const expression: Types.Pattern = new Core.ExpectFlowPattern(
  new BinaryExpression(
    new Core.SetValuePattern(Nodes.Or, new Core.ChooseUnitPattern(Lexer.Tokens.Or, Lexer.Tokens.VerticalBar)),
    new BinaryExpression(
      new Core.SetValuePattern(Nodes.And, new Core.ChooseUnitPattern(Lexer.Tokens.And, Lexer.Tokens.Ampersand)),
      new UnaryExpression(
        unaryOperators,
        new Core.PlaceNodePattern(
          Core.Nodes.Right,
          new BinaryExpression(
            new Core.SetValuePattern(Nodes.Access, new Core.ExpectUnitPattern(Lexer.Tokens.Period)),
            new Core.ChooseFlowPattern(mapOperand, rangeOperand, referenceOperand, generalOperands, groupExpression)
          )
        )
      )
    )
  ),
  conditionExpression
);

/**
 * Skip directive route.
 */
const skip = new Core.SetValueRoute(Nodes.Skip, expression, Lexer.Tokens.Skip);

/**
 * Token directive route.
 */
const token = new Core.SetValueRoute(
  Nodes.Token,
  new DirectiveExpression(Symbols.Token, argumentExpression, expression),
  Lexer.Tokens.Token
);

/**
 * Node directive route.
 */
const node = new Core.SetValueRoute(
  Nodes.Node,
  new DirectiveExpression(Symbols.Node, argumentExpression, expression),
  Lexer.Tokens.Node
);

/**
 * Alias parameters list pattern.
 */
const aliasParameterList: Types.Pattern = new Core.ExpectFlowPattern(
  new Core.EmitSymbolPattern(Symbols.AliasParameter, new Core.ExpectUnitPattern(Lexer.Tokens.Identifier)),
  new Core.OptFlowPattern(
    new Core.ExpectUnitPattern(Lexer.Tokens.Comma),
    new Core.RunFlowPattern(() => aliasParameterList)
  )
);

/**
 * Alias directives route.
 */
const aliases = new Core.FlowRoute(
  new Core.ExpectFlowPattern(
    new Core.OptFlowPattern(
      new Core.ScopeSymbolPattern(
        new Core.ExpectUnitPattern(Lexer.Tokens.OpenChevron),
        aliasParameterList,
        new Core.ExpectUnitPattern(Lexer.Tokens.CloseChevron)
      )
    ),
    new Core.MapFlowPattern(
      new Core.SetValueRoute(
        Nodes.AliasToken,
        new DirectiveExpression(Symbols.AliasToken, argumentExpression, expression),
        Lexer.Tokens.Token
      ),
      new Core.SetValueRoute(
        Nodes.AliasNode,
        new DirectiveExpression(Symbols.AliasNode, argumentExpression, expression),
        Lexer.Tokens.Node
      )
    )
  ),
  Lexer.Tokens.Alias
);

/**
 * Export modifier route.
 */
const exporter = new Core.SetValueRoute(
  Nodes.Export,
  new Core.AppendNodePattern(
    Core.Source.Output,
    Core.Nodes.Right,
    Core.Nodes.Right,
    new Core.MapFlowPattern(token, node, aliases, new Core.SetValueRoute(Nodes.Identifier, Lexer.Tokens.Identifier))
  ),
  Lexer.Tokens.Export
);

/**
 * Import module route.
 */
const importer = new Core.SetValueRoute(
  Nodes.Import,
  new Core.AppendNodePattern(
    Nodes.String,
    Core.Nodes.Right,
    Core.Nodes.Right,
    new Core.ExpectUnitPattern(Lexer.Tokens.String)
  ),
  Lexer.Tokens.Import
);

/**
 * Main parser pattern.
 */
export const Program = new Core.ExpectFlowPattern(
  new Core.OptFlowPattern(
    new Core.RepeatFlowPattern(
      new Core.EmitNodePattern(
        Core.Source.Output,
        Core.Nodes.Right,
        new Core.MapFlowPattern(skip, token, node, aliases, exporter, importer),
        new Core.ExpectUnitPattern(Lexer.Tokens.Semicolon)
      )
    )
  ),
  new Core.EndFlowPattern()
);
