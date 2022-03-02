import * as Core from '@xcheme/core';

import { Tokens } from './tokens';

/**
 * White-spaces pattern.
 */
const whiteSpaces = new Core.ChooseUnitPattern(' ', '\t', '\v', '\f', '\r', '\n');

/**
 * Comment line pattern.
 */
const commentLine = new Core.ExpectFlowPattern(
  new Core.ExpectUnitPattern('/', '/'),
  new Core.OptFlowPattern(
    new Core.RepeatFlowPattern(
      new Core.ConditionFlowPattern(
        new Core.NotFlowPattern(new Core.ExpectUnitPattern('\n')),
        new Core.AnyUnitPattern()
      )
    )
  )
);

/**
 * Comment block pattern.
 */
const commentBlock = new Core.ExpectFlowPattern(
  new Core.ExpectUnitPattern('/', '*'),
  new Core.OptFlowPattern(
    new Core.RepeatFlowPattern(
      new Core.ConditionFlowPattern(
        new Core.NotFlowPattern(new Core.ExpectUnitPattern('*', '/')),
        new Core.AnyUnitPattern()
      )
    )
  ),
  new Core.ExpectUnitPattern('*', '/')
);

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
 * Keywords and symbols pattern.
 */
const keywordsAndSymbols = new Core.MapFlowPattern(
  new Core.SetValueRoute(Tokens.Any, end, 'a', 'n', 'y'),
  new Core.SetValueRoute(Tokens.From, end, 'f', 'r', 'o', 'm'),
  new Core.SetValueRoute(Tokens.To, end, 't', 'o'),
  new Core.SetValueRoute(Tokens.Map, end, 'm', 'a', 'p'),
  new Core.SetValueRoute(Tokens.Then, end, 't', 'h', 'e', 'n'),
  new Core.SetValueRoute(Tokens.Else, end, 'e', 'l', 's', 'e'),
  new Core.SetValueRoute(Tokens.Or, end, 'o', 'r'),
  new Core.SetValueRoute(Tokens.And, end, 'a', 'n', 'd'),
  new Core.SetValueRoute(Tokens.Not, end, 'n', 'o', 't'),
  new Core.SetValueRoute(Tokens.Opt, end, 'o', 'p', 't'),
  new Core.SetValueRoute(Tokens.Repeat, end, 'r', 'e', 'p', 'e', 'a', 't'),
  new Core.SetValueRoute(Tokens.Place, end, 'p', 'l', 'a', 'c', 'e'),
  new Core.SetValueRoute(Tokens.Append, end, 'a', 'p', 'p', 'e', 'n', 'd'),
  new Core.SetValueRoute(Tokens.Prepend, end, 'p', 'r', 'e', 'p', 'e', 'n', 'd'),
  new Core.SetValueRoute(Tokens.Pivot, end, 'p', 'i', 'v', 'o', 't'),
  new Core.SetValueRoute(Tokens.Next, end, 'n', 'e', 'x', 't'),
  new Core.SetValueRoute(Tokens.Left, end, 'l', 'e', 'f', 't'),
  new Core.SetValueRoute(Tokens.Right, end, 'r', 'i', 'g', 'h', 't'),
  new Core.SetValueRoute(Tokens.Symbol, end, 's', 'y', 'm', 'b', 'o', 'l'),
  new Core.SetValueRoute(Tokens.Scope, end, 's', 'c', 'o', 'p', 'e'),
  new Core.SetValueRoute(Tokens.Error, end, 'e', 'r', 'r', 'o', 'r'),
  new Core.SetValueRoute(Tokens.Has, end, 'h', 'a', 's'),
  new Core.SetValueRoute(Tokens.Set, end, 's', 'e', 't'),
  new Core.SetValueRoute(Tokens.Uncase, end, 'u', 'n', 'c', 'a', 's', 'e'),
  new Core.SetValueRoute(Tokens.Peek, end, 'p', 'e', 'e', 'k'),
  new Core.SetValueRoute(Tokens.Skip, end, 's', 'k', 'i', 'p'),
  new Core.SetValueRoute(Tokens.Token, end, 't', 'o', 'k', 'e', 'n'),
  new Core.SetValueRoute(Tokens.Node, end, 'n', 'o', 'd', 'e'),
  new Core.SetValueRoute(Tokens.Alias, end, 'a', 'l', 'i', 'a', 's'),
  new Core.SetValueRoute(Tokens.Auto, end, 'a', 'u', 't', 'o'),
  new Core.SetValueRoute(Tokens.As, end, 'a', 's'),
  new Core.SetValueRoute(Tokens.Import, end, 'i', 'm', 'p', 'o', 'r', 't'),
  new Core.SetValueRoute(Tokens.Export, end, 'e', 'x', 'p', 'o', 'r', 't'),
  new Core.SetValueRoute(Tokens.Asterisk, '*'),
  new Core.SetValueRoute(Tokens.VerticalBar, '|'),
  new Core.SetValueRoute(Tokens.Ampersand, '&'),
  new Core.SetValueRoute(Tokens.Period, '.'),
  new Core.SetValueRoute(Tokens.Comma, ','),
  new Core.SetValueRoute(Tokens.Semicolon, ';'),
  new Core.SetValueRoute(Tokens.OpenBraces, '{'),
  new Core.SetValueRoute(Tokens.CloseBraces, '}'),
  new Core.SetValueRoute(Tokens.OpenParenthesis, '('),
  new Core.SetValueRoute(Tokens.CloseParenthesis, ')'),
  new Core.SetValueRoute(Tokens.OpenChevron, '<'),
  new Core.SetValueRoute(Tokens.CloseChevron, '>')
);

/**
 * Integer number pattern.
 */
const literalInteger = new Core.SetValuePattern(
  Tokens.Number,
  new Core.ChooseFlowPattern(
    new Core.ExpectUnitPattern('0'),
    new Core.ExpectFlowPattern(
      new Core.RangeUnitPattern('1', '9'),
      new Core.OptFlowPattern(new Core.RepeatFlowPattern(digit))
    )
  )
);

/**
 * Single quoted string pattern.
 */
const literalString = new Core.SetValuePattern(
  Tokens.String,
  new Core.ExpectUnitPattern("'"),
  new Core.RepeatFlowPattern(
    new Core.ConditionFlowPattern(
      new Core.ExpectUnitPattern('\\'),
      new Core.AnyUnitPattern(),
      new Core.ConditionFlowPattern(new Core.NotFlowPattern(new Core.ExpectUnitPattern("'")), new Core.AnyUnitPattern())
    )
  ),
  new Core.ExpectUnitPattern("'")
);

/**
 * Identifier pattern.
 */
const identifier = new Core.SetValuePattern(
  Tokens.Identifier,
  new Core.ChooseFlowPattern(alpha, extra),
  new Core.OptFlowPattern(new Core.RepeatFlowPattern(word))
);

/**
 * Main lexer pattern.
 */
export const Program = new Core.ExpectFlowPattern(
  new Core.OptFlowPattern(
    new Core.RepeatFlowPattern(
      new Core.ChooseFlowPattern(
        whiteSpaces,
        commentLine,
        commentBlock,
        new Core.EmitTokenPattern(
          Core.TextSource.Output,
          new Core.ChooseFlowPattern(keywordsAndSymbols, literalInteger, literalString, identifier)
        )
      )
    )
  ),
  new Core.EndFlowPattern()
);
