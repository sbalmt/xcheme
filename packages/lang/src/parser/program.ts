import * as Core from '@xcheme/core';
import * as Lexer from '../lexer';

import BinaryExpression from './patterns/binary';
import UnaryExpression from './patterns/unary';

import { Symbols } from './symbols';
import { Nodes } from './nodes';

/**
 * Main parser program.
 */
const expression: Core.Pattern = new Core.ExpectFlowPattern(
  // Or expressions
  new BinaryExpression(
    new Core.MapFlowPattern(new Core.SetValueRoute(Nodes.Or, Lexer.Tokens.Or)),
    // And expressions
    new BinaryExpression(
      new Core.MapFlowPattern(new Core.SetValueRoute(Nodes.And, Lexer.Tokens.And)),
      // Unary operations
      new UnaryExpression(
        new Core.MapFlowPattern(
          new Core.SetValueRoute(Nodes.Not, Lexer.Tokens.Not),
          new Core.SetValueRoute(Nodes.Opt, Lexer.Tokens.Opt),
          new Core.SetValueRoute(Nodes.Rep, Lexer.Tokens.Rep),
          new Core.SetValueRoute(Nodes.Place, Lexer.Tokens.Place),
          new Core.SetValueRoute(Nodes.Pivot, Lexer.Tokens.Pivot),
          new Core.SetValueRoute(Nodes.Append, Lexer.Tokens.Append),
          new Core.SetValueRoute(Nodes.Prepend, Lexer.Tokens.Prepend),
          new Core.SetValueRoute(Nodes.PlaceNext, Lexer.Tokens.Place, Lexer.Tokens.Next),
          new Core.SetValueRoute(Nodes.AppendNext, Lexer.Tokens.Append, Lexer.Tokens.Next),
          new Core.SetValueRoute(Nodes.PrependNext, Lexer.Tokens.Prepend, Lexer.Tokens.Next),
          new Core.SetValueRoute(Nodes.Symbol, Lexer.Tokens.Symbol),
          new Core.SetValueRoute(Nodes.Scope, Lexer.Tokens.Scope)
        ),
        new Core.ChooseFlowPattern(
          // Range
          new Core.PlaceNodePattern(
            Core.Nodes.Right,
            new Core.ExpectUnitPattern(Lexer.Tokens.From),
            new Core.AppendNodePattern(
              Core.BaseSource.Output,
              Core.Nodes.Right,
              Core.Nodes.Right,
              new Core.SetValuePattern(Nodes.Alphabet, new Core.ExpectUnitPattern(Lexer.Tokens.Alphabet))
            ),
            new Core.PivotNodePattern(
              Nodes.Range,
              Core.Nodes.Right,
              Core.Nodes.Left,
              new Core.SetValuePattern(Nodes.Range, new Core.ExpectUnitPattern(Lexer.Tokens.To)),
              new Core.AppendNodePattern(
                Core.BaseSource.Output,
                Core.Nodes.Right,
                Core.Nodes.Right,
                new Core.SetValuePattern(Nodes.Alphabet, new Core.ExpectUnitPattern(Lexer.Tokens.Alphabet))
              )
            )
          ),
          // Any, Alphabet & Reference
          new Core.AppendNodePattern(
            Core.BaseSource.Output,
            Core.Nodes.Right,
            Core.Nodes.Right,
            new Core.MapFlowPattern(
              new Core.SetValueRoute(Nodes.Any, Lexer.Tokens.Any),
              new Core.SetValueRoute(Nodes.Alphabet, Lexer.Tokens.Alphabet),
              new Core.SetValueRoute(Nodes.Reference, Lexer.Tokens.Identifier)
            )
          ),
          // Group
          new Core.PlaceNodePattern(
            Core.Nodes.Right,
            new Core.ExpectFlowPattern(
              new Core.ExpectUnitPattern(Lexer.Tokens.OpenParentheses),
              new Core.RunFlowPattern(() => expression),
              new Core.ExpectUnitPattern(Lexer.Tokens.CloseParentheses)
            )
          )
        )
      )
    )
  ),
  // Condition
  new Core.OptionFlowPattern(
    new Core.PivotNodePattern(
      Nodes.Then,
      Core.Nodes.Right,
      Core.Nodes.Left,
      new Core.ExpectUnitPattern(Lexer.Tokens.Then),
      new Core.RunFlowPattern(() => expression),
      new Core.OptionFlowPattern(
        new Core.PivotNodePattern(
          Nodes.Else,
          Core.Nodes.Right,
          Core.Nodes.Left,
          new Core.ExpectUnitPattern(Lexer.Tokens.Else),
          new Core.RunFlowPattern(() => expression)
        )
      )
    )
  )
);

const tokenStatement = new Core.ExpectFlowPattern(
  new Core.EmitSymbolPattern(
    Symbols.Token,
    new Core.AppendNodePattern(
      Nodes.Identifier,
      Core.Nodes.Right,
      Core.Nodes.Right,
      new Core.ExpectUnitPattern(Lexer.Tokens.Identifier)
    )
  ),
  new Core.ExpectUnitPattern(Lexer.Tokens.As),
  new Core.PlaceNodePattern(Core.Nodes.Right, expression)
);

const nodeStatement = new Core.ExpectFlowPattern(
  new Core.EmitSymbolPattern(
    Symbols.Node,
    new Core.AppendNodePattern(
      Nodes.Identifier,
      Core.Nodes.Right,
      Core.Nodes.Right,
      new Core.ExpectUnitPattern(Lexer.Tokens.Identifier)
    )
  ),
  new Core.ExpectUnitPattern(Lexer.Tokens.As),
  new Core.PlaceNodePattern(Core.Nodes.Right, expression)
);

export const Program = new Core.ExpectFlowPattern(
  new Core.OptionFlowPattern(
    new Core.RepeatFlowPattern(
      new Core.ChooseFlowPattern(
        new Core.EmitNodePattern(
          Core.BaseSource.Output,
          Core.Nodes.Right,
          new Core.MapFlowPattern(
            new Core.SetValueRoute(Nodes.Skip, expression, Lexer.Tokens.Skip),
            new Core.SetValueRoute(Nodes.Token, tokenStatement, Lexer.Tokens.Token),
            new Core.SetValueRoute(Nodes.Node, nodeStatement, Lexer.Tokens.Node),
            new Core.Route(
              new Core.MapFlowPattern(
                new Core.SetValueRoute(Nodes.AliasToken, tokenStatement, Lexer.Tokens.Token),
                new Core.SetValueRoute(Nodes.AliasNode, nodeStatement, Lexer.Tokens.Node)
              ),
              Lexer.Tokens.Alias
            )
          )
        ),
        new Core.ExpectUnitPattern(Lexer.Tokens.Semicolon)
      )
    )
  ),
  new Core.EndFlowPattern()
);
