import * as Core from '@xcheme/core';

import { Tokens } from './tokens';

/**
 * Alpha characters.
 */
const alpha = new Core.ChooseFlowPattern(new Core.RangeUnitPattern('a', 'z'), new Core.RangeUnitPattern('A', 'Z'));

/**
 * Digit characters.
 */
const digit = new Core.RangeUnitPattern('0', '9');

/**
 * Extra characters for identifiers.
 */
const extra = new Core.ExpectUnitPattern('_');

/**
 * Word characters.
 */
const word = new Core.ChooseFlowPattern(alpha, digit, extra);

/**
 * Word boundary pattern.
 */
const end = new Core.NotFlowPattern(word);

/**
 * Main lexer program.
 */
export const Program = new Core.ExpectFlowPattern(
  new Core.OptFlowPattern(
    new Core.RepeatFlowPattern(
      new Core.ChooseFlowPattern(
        // White space
        new Core.ChooseUnitPattern(' ', '\t', '\v', '\f', '\r', '\n'),
        // Comment
        new Core.ExpectFlowPattern(
          new Core.ExpectUnitPattern('/', '/'),
          new Core.OptFlowPattern(
            new Core.RepeatFlowPattern(
              new Core.ConditionFlowPattern(new Core.NotFlowPattern(new Core.ExpectUnitPattern('\n')), new Core.AnyUnitPattern())
            )
          )
        ),
        // Comment block
        new Core.ExpectFlowPattern(
          new Core.ExpectUnitPattern('/', '*'),
          new Core.OptFlowPattern(
            new Core.RepeatFlowPattern(
              new Core.ConditionFlowPattern(new Core.NotFlowPattern(new Core.ExpectUnitPattern('*', '/')), new Core.AnyUnitPattern())
            )
          ),
          new Core.ExpectUnitPattern('*', '/')
        ),
        // Tokens
        new Core.EmitTokenPattern(
          Core.TextSource.Output,
          new Core.ChooseFlowPattern(
            // Keywords, Functions and Symbols
            new Core.MapFlowPattern(
              new Core.SetValueRoute(Tokens.Any, end, 'a', 'n', 'y'),
              new Core.SetValueRoute(Tokens.From, end, 'f', 'r', 'o', 'm'),
              new Core.SetValueRoute(Tokens.To, end, 't', 'o'),
              new Core.SetValueRoute(Tokens.Not, end, 'n', 'o', 't'),
              new Core.SetValueRoute(Tokens.Opt, end, 'o', 'p', 't'),
              new Core.SetValueRoute(Tokens.Repeat, end, 'r', 'e', 'p', 'e', 'a', 't'),
              new Core.SetValueRoute(Tokens.Place, end, 'p', 'l', 'a', 'c', 'e'),
              new Core.SetValueRoute(Tokens.Pivot, end, 'p', 'i', 'v', 'o', 't'),
              new Core.SetValueRoute(Tokens.Append, end, 'a', 'p', 'p', 'e', 'n', 'd'),
              new Core.SetValueRoute(Tokens.Prepend, end, 'p', 'r', 'e', 'p', 'e', 'n', 'd'),
              new Core.SetValueRoute(Tokens.Next, end, 'n', 'e', 'x', 't'),
              new Core.SetValueRoute(Tokens.Left, end, 'l', 'e', 'f', 't'),
              new Core.SetValueRoute(Tokens.Right, end, 'r', 'i', 'g', 'h', 't'),
              new Core.SetValueRoute(Tokens.Symbol, end, 's', 'y', 'm', 'b', 'o', 'l'),
              new Core.SetValueRoute(Tokens.Scope, end, 's', 'c', 'o', 'p', 'e'),
              new Core.SetValueRoute(Tokens.Error, end, 'e', 'r', 'r', 'o', 'r'),
              new Core.SetValueRoute(Tokens.Has, end, 'h', 'a', 's'),
              new Core.SetValueRoute(Tokens.Set, end, 's', 'e', 't'),
              new Core.SetValueRoute(Tokens.Or, end, 'o', 'r'),
              new Core.SetValueRoute(Tokens.And, end, 'a', 'n', 'd'),
              new Core.SetValueRoute(Tokens.Then, end, 't', 'h', 'e', 'n'),
              new Core.SetValueRoute(Tokens.Else, end, 'e', 'l', 's', 'e'),
              new Core.SetValueRoute(Tokens.Skip, end, 's', 'k', 'i', 'p'),
              new Core.SetValueRoute(Tokens.Alias, end, 'a', 'l', 'i', 'a', 's'),
              new Core.SetValueRoute(Tokens.Token, end, 't', 'o', 'k', 'e', 'n'),
              new Core.SetValueRoute(Tokens.Node, end, 'n', 'o', 'd', 'e'),
              new Core.SetValueRoute(Tokens.As, end, 'a', 's'),
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
              new Core.ChooseFlowPattern(
                new Core.ExpectUnitPattern('0'),
                new Core.ExpectFlowPattern(
                  new Core.RangeUnitPattern('1', '9'),
                  new Core.OptFlowPattern(new Core.RepeatFlowPattern(digit))
                )
              )
            ),
            // String
            new Core.SetValuePattern(
              Tokens.Alphabet,
              new Core.ExpectUnitPattern("'"),
              new Core.RepeatFlowPattern(
                new Core.ConditionFlowPattern(
                  new Core.ExpectUnitPattern('\\'),
                  new Core.AnyUnitPattern(),
                  new Core.ConditionFlowPattern(new Core.NotFlowPattern(new Core.ExpectUnitPattern("'")), new Core.AnyUnitPattern())
                )
              ),
              new Core.ExpectUnitPattern("'")
            ),
            // Identifier
            new Core.SetValuePattern(
              Tokens.Identifier,
              new Core.ChooseFlowPattern(alpha, extra),
              new Core.OptFlowPattern(new Core.RepeatFlowPattern(word))
            )
          )
        )
      )
    )
  ),
  new Core.EndFlowPattern()
);
