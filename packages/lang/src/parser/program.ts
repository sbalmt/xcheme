import * as Core from '@xcheme/core';
import * as Lexer from '../lexer';

import DirectiveExpression from './patterns/directive';
import BinaryExpression from './patterns/binary';
import UnaryExpression from './patterns/unary';

import { Symbols } from './symbols';
import { Nodes } from './nodes';

/**
 * Identity pattern.
 */
const identity = new Core.ExpectFlowPattern(
  new Core.ExpectUnitPattern(Lexer.Tokens.OpenChevron),
  new Core.AppendNodePattern(
    Nodes.Identity,
    Core.Nodes.Left,
    Core.Nodes.Right,
    new Core.ChooseUnitPattern(Lexer.Tokens.Number, Lexer.Tokens.Auto),
    new Core.ExpectUnitPattern(Lexer.Tokens.CloseChevron)
  )
);

/**
 * State pattern.
 */
const state = new Core.ExpectFlowPattern(
  new Core.ExpectUnitPattern(Lexer.Tokens.OpenChevron),
  new Core.AppendNodePattern(
    Nodes.State,
    Core.Nodes.Left,
    Core.Nodes.Right,
    new Core.ExpectUnitPattern(Lexer.Tokens.Number),
    new Core.ExpectUnitPattern(Lexer.Tokens.CloseChevron)
  )
);

/**
 * Unary operators pattern.
 */
const unaryOperators = new Core.MapFlowPattern(
  new Core.SetValueRoute(Nodes.Not, Lexer.Tokens.Not),
  new Core.SetValueRoute(Nodes.Opt, Lexer.Tokens.Opt),
  new Core.SetValueRoute(Nodes.Repeat, Lexer.Tokens.Repeat),
  new Core.SetValueRoute(Nodes.PlaceNext, Lexer.Tokens.Place, Lexer.Tokens.Next),
  new Core.SetValueRoute(Nodes.PlaceLeft, Lexer.Tokens.Place, Lexer.Tokens.Left),
  new Core.SetValueRoute(Nodes.PlaceRight, Lexer.Tokens.Place, Lexer.Tokens.Right),
  new Core.SetValueRoute(Nodes.Place, Lexer.Tokens.Place),
  new Core.SetValueRoute(Nodes.AppendNext, Lexer.Tokens.Append, Lexer.Tokens.Next),
  new Core.SetValueRoute(Nodes.AppendLeft, Lexer.Tokens.Append, Lexer.Tokens.Left),
  new Core.SetValueRoute(Nodes.AppendRight, Lexer.Tokens.Append, Lexer.Tokens.Right),
  new Core.SetValueRoute(Nodes.Append, Lexer.Tokens.Append),
  new Core.SetValueRoute(Nodes.PrependNext, Lexer.Tokens.Prepend, Lexer.Tokens.Next),
  new Core.SetValueRoute(Nodes.PrependLeft, Lexer.Tokens.Prepend, Lexer.Tokens.Left),
  new Core.SetValueRoute(Nodes.PrependRight, Lexer.Tokens.Prepend, Lexer.Tokens.Right),
  new Core.SetValueRoute(Nodes.Prepend, Lexer.Tokens.Prepend),
  new Core.SetValueRoute(Nodes.Pivot, Lexer.Tokens.Pivot),
  new Core.SetValueRoute(Nodes.Symbol, Lexer.Tokens.Symbol),
  new Core.SetValueRoute(Nodes.Scope, Lexer.Tokens.Scope),
  new Core.SetValueRoute(Nodes.Error, state, Lexer.Tokens.Error),
  new Core.SetValueRoute(Nodes.Has, state, Lexer.Tokens.Has),
  new Core.SetValueRoute(Nodes.Set, state, Lexer.Tokens.Set)
);

/**
 * Map members pattern.
 */
const mapMembers: Core.Pattern = new Core.ExpectFlowPattern(
  new Core.AppendNodePattern(
    Nodes.Member,
    Core.Nodes.Right,
    Core.Nodes.Next,
    new Core.ChooseFlowPattern(
      new DirectiveExpression(Symbols.Member, identity, new Core.RunFlowPattern(() => expression)),
      new Core.RunFlowPattern(() => expression)
    )
  ),
  new Core.OptFlowPattern(new Core.ExpectUnitPattern(Lexer.Tokens.Comma), new Core.RunFlowPattern(() => mapMembers))
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
      new Core.OptFlowPattern(mapMembers),
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
  new Core.AppendNodePattern(Nodes.String, Core.Nodes.Right, Core.Nodes.Right, new Core.ExpectUnitPattern(Lexer.Tokens.String)),
  new Core.PivotNodePattern(
    Nodes.Range,
    Core.Nodes.Right,
    Core.Nodes.Left,
    new Core.ExpectUnitPattern(Lexer.Tokens.To),
    new Core.AppendNodePattern(Nodes.String, Core.Nodes.Right, Core.Nodes.Right, new Core.ExpectUnitPattern(Lexer.Tokens.String))
  )
);

/**
 * General operands pattern.
 */
const generalOperands = new Core.AppendNodePattern(
  Core.BaseSource.Output,
  Core.Nodes.Right,
  Core.Nodes.Right,
  new Core.MapFlowPattern(
    new Core.SetValueRoute(Nodes.Any, Lexer.Tokens.Any),
    new Core.SetValueRoute(Nodes.Any, Lexer.Tokens.Asterisk),
    new Core.SetValueRoute(Nodes.String, Lexer.Tokens.String),
    new Core.SetValueRoute(Nodes.Reference, Lexer.Tokens.Identifier)
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
const expression: Core.Pattern = new Core.ExpectFlowPattern(
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
            new Core.ChooseFlowPattern(mapOperand, rangeOperand, generalOperands, groupExpression)
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
const token = new Core.SetValueRoute(Nodes.Token, new DirectiveExpression(Symbols.Token, identity, expression), Lexer.Tokens.Token);

/**
 * Node directive route.
 */
const node = new Core.SetValueRoute(Nodes.Node, new DirectiveExpression(Symbols.Node, identity, expression), Lexer.Tokens.Node);

/**
 * Alias token directive route.
 */
const aliasToken = new Core.SetValueRoute(
  Nodes.AliasToken,
  new DirectiveExpression(Symbols.AliasToken, identity, expression),
  Lexer.Tokens.Alias,
  Lexer.Tokens.Token
);

/**
 * Alias node directive route.
 */
const aliasNode = new Core.SetValueRoute(
  Nodes.AliasNode,
  new DirectiveExpression(Symbols.AliasNode, identity, expression),
  Lexer.Tokens.Alias,
  Lexer.Tokens.Node
);

/**
 * Main parser pattern.
 */
export const Program = new Core.ExpectFlowPattern(
  new Core.OptFlowPattern(
    new Core.RepeatFlowPattern(
      new Core.ChooseFlowPattern(
        new Core.EmitNodePattern(
          Core.BaseSource.Output,
          Core.Nodes.Right,
          new Core.MapFlowPattern(skip, token, node, aliasToken, aliasNode),
          new Core.ExpectUnitPattern(Lexer.Tokens.Semicolon)
        )
      )
    )
  ),
  new Core.EndFlowPattern()
);
