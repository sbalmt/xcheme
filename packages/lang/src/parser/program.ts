import * as Core from '@xcheme/core';

import * as Types from '../core/types';
import * as Lexer from '../lexer';

import UnaryExpression from './patterns/unary';
import BinaryExpression from './patterns/binary';
import DirectiveExpression from './patterns/directive';

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
 * Append operator pattern.
 */
const appendOperator = new Core.ExpectFlowPattern(
  new Core.OptFlowPattern(argumentExpression),
  new Core.UseValuePattern(
    Nodes.Append,
    new Core.OptFlowPattern(
      new Core.MapFlowPattern(
        new Core.SetValueRoute(Nodes.AppendLeft, Lexer.Tokens.Left),
        new Core.SetValueRoute(Nodes.AppendRight, Lexer.Tokens.Right),
        new Core.SetValueRoute(Nodes.AppendNext, Lexer.Tokens.Next)
      )
    )
  )
);

/**
 * Prepend operator patten.
 */
const prependOperator = new Core.ExpectFlowPattern(
  new Core.OptFlowPattern(argumentExpression),
  new Core.UseValuePattern(
    Nodes.Prepend,
    new Core.OptFlowPattern(
      new Core.MapFlowPattern(
        new Core.SetValueRoute(Nodes.PrependLeft, Lexer.Tokens.Left),
        new Core.SetValueRoute(Nodes.PrependRight, Lexer.Tokens.Right),
        new Core.SetValueRoute(Nodes.PrependNext, Lexer.Tokens.Next)
      )
    )
  )
);

/**
 * Unary operators pattern.
 */
const unaryOperators = new Core.MapFlowPattern(
  new Core.SetValueRoute(Nodes.Not, Lexer.Tokens.Not),
  new Core.SetValueRoute(Nodes.Opt, Lexer.Tokens.Opt),
  new Core.SetValueRoute(Nodes.Repeat, Lexer.Tokens.Repeat),
  new Core.SetValueRoute(Nodes.PlaceLeft, Lexer.Tokens.Place, Lexer.Tokens.Left),
  new Core.SetValueRoute(Nodes.PlaceRight, Lexer.Tokens.Place, Lexer.Tokens.Right),
  new Core.SetValueRoute(Nodes.PlaceNext, Lexer.Tokens.Place, Lexer.Tokens.Next),
  new Core.SetValueRoute(Nodes.Place, Lexer.Tokens.Place),
  new Core.FlowRoute(appendOperator, Lexer.Tokens.Append),
  new Core.FlowRoute(prependOperator, Lexer.Tokens.Prepend),
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
      new DirectiveExpression(Symbols.MapMember, argumentExpression, new Core.RunFlowPattern(() => expression)),
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
