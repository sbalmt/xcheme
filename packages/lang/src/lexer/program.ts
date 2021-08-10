import * as Core from '@xcheme/core';

import { Tokens } from './tokens';

/**
 * Main lexer program.
 */
export const Program = new Core.ExpectFlowPattern(
  new Core.OptionFlowPattern(
    new Core.RepeatFlowPattern(
      new Core.ChooseFlowPattern(
        // White space
        new Core.ChooseUnitPattern(' ', '\t', '\v', '\f', '\r', '\n'),
        // Comment
        new Core.ExpectFlowPattern(
          new Core.ExpectUnitPattern('/', '/'),
          new Core.OptionFlowPattern(
            new Core.RepeatFlowPattern(
              new Core.ConditionFlowPattern(new Core.NegateFlowPattern(new Core.ExpectUnitPattern('\n')), new Core.AnyUnitPattern())
            )
          )
        ),
        // Comment block
        new Core.ExpectFlowPattern(
          new Core.ExpectUnitPattern('/', '*'),
          new Core.OptionFlowPattern(
            new Core.RepeatFlowPattern(
              new Core.ConditionFlowPattern(
                new Core.NegateFlowPattern(new Core.ExpectUnitPattern('*', '/')),
                new Core.AnyUnitPattern()
              )
            )
          ),
          new Core.ExpectUnitPattern('*', '/')
        ),
        // Tokens
        new Core.EmitTokenPattern(
          Core.TextSource.Output,
          new Core.ChooseFlowPattern(
            // Keywords and Symbols
            new Core.MapFlowPattern(
              new Core.SetValueRoute(Tokens.Any, 'a', 'n', 'y'),
              new Core.SetValueRoute(Tokens.From, 'f', 'r', 'o', 'm'),
              new Core.SetValueRoute(Tokens.To, 't', 'o'),
              new Core.SetValueRoute(Tokens.Not, 'n', 'o', 't'),
              new Core.SetValueRoute(Tokens.Opt, 'o', 'p', 't'),
              new Core.SetValueRoute(Tokens.Rep, 'r', 'e', 'p'),
              new Core.SetValueRoute(Tokens.Place, 'p', 'l', 'a', 'c', 'e'),
              new Core.SetValueRoute(Tokens.Pivot, 'p', 'i', 'v', 'o', 't'),
              new Core.SetValueRoute(Tokens.Append, 'a', 'p', 'p', 'e', 'n', 'd'),
              new Core.SetValueRoute(Tokens.Prepend, 'p', 'r', 'e', 'p', 'e', 'n', 'd'),
              new Core.SetValueRoute(Tokens.Next, 'n', 'e', 'x', 't'),
              new Core.SetValueRoute(Tokens.Left, 'l', 'e', 'f', 't'),
              new Core.SetValueRoute(Tokens.Right, 'r', 'i', 'g', 'h', 't'),
              new Core.SetValueRoute(Tokens.Symbol, 's', 'y', 'm', 'b', 'o', 'l'),
              new Core.SetValueRoute(Tokens.Scope, 's', 'c', 'o', 'p', 'e'),
              new Core.SetValueRoute(Tokens.Or, 'o', 'r'),
              new Core.SetValueRoute(Tokens.And, 'a', 'n', 'd'),
              new Core.SetValueRoute(Tokens.Then, 't', 'h', 'e', 'n'),
              new Core.SetValueRoute(Tokens.Else, 'e', 'l', 's', 'e'),
              new Core.SetValueRoute(Tokens.Skip, 's', 'k', 'i', 'p'),
              new Core.SetValueRoute(Tokens.Alias, 'a', 'l', 'i', 'a', 's'),
              new Core.SetValueRoute(Tokens.Token, 't', 'o', 'k', 'e', 'n'),
              new Core.SetValueRoute(Tokens.Node, 'n', 'o', 'd', 'e'),
              new Core.SetValueRoute(Tokens.As, 'a', 's'),
              new Core.SetValueRoute(Tokens.Any, '*'),
              new Core.SetValueRoute(Tokens.Or, '|'),
              new Core.SetValueRoute(Tokens.And, '&'),
              new Core.SetValueRoute(Tokens.Semicolon, ';'),
              new Core.SetValueRoute(Tokens.OpenParentheses, '('),
              new Core.SetValueRoute(Tokens.CloseParentheses, ')'),
              new Core.SetValueRoute(Tokens.OpenChevron, '<'),
              new Core.SetValueRoute(Tokens.CloseChevron, '>')
            ),
            // Number
            new Core.SetValuePattern(
              Tokens.Number,
              new Core.RangeUnitPattern('1', '9'),
              new Core.OptionFlowPattern(new Core.RepeatFlowPattern(new Core.RangeUnitPattern('0', '9')))
            ),
            // String
            new Core.SetValuePattern(
              Tokens.Alphabet,
              new Core.ExpectUnitPattern("'"),
              new Core.RepeatFlowPattern(
                new Core.ConditionFlowPattern(
                  new Core.ExpectUnitPattern('\\'),
                  new Core.AnyUnitPattern(),
                  new Core.ConditionFlowPattern(new Core.NegateFlowPattern(new Core.ExpectUnitPattern("'")), new Core.AnyUnitPattern())
                )
              ),
              new Core.ExpectUnitPattern("'")
            ),
            // Identifier
            new Core.SetValuePattern(
              Tokens.Identifier,
              new Core.ChooseFlowPattern(
                new Core.RangeUnitPattern('A', 'Z'),
                new Core.RangeUnitPattern('a', 'z'),
                new Core.ExpectUnitPattern('_')
              ),
              new Core.OptionFlowPattern(
                new Core.RepeatFlowPattern(
                  new Core.ChooseFlowPattern(
                    new Core.RangeUnitPattern('A', 'Z'),
                    new Core.RangeUnitPattern('a', 'z'),
                    new Core.RangeUnitPattern('0', '9'),
                    new Core.ExpectUnitPattern('_')
                  )
                )
              )
            )
          )
        )
      )
    )
  ),
  new Core.EndFlowPattern()
);
