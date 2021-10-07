import * as Core from '@xcheme/core';

import { Lexer, Errors } from '../../src/index';

const tokens = [
  // Operands
  ...[
    // Identifier
    { name: 'NAME', value: Lexer.Tokens.Identifier },
    // Number
    { name: '1234567890', value: Lexer.Tokens.Number },
    { name: 'auto', value: Lexer.Tokens.Auto },
    // String
    { name: "'text'", value: Lexer.Tokens.String },
    // Any unit
    { name: 'any', value: Lexer.Tokens.Any },
    { name: '*', value: Lexer.Tokens.Any },
    // Unit range
    { name: 'from', value: Lexer.Tokens.From },
    { name: 'to', value: Lexer.Tokens.To }
  ],
  // Functions
  ...[
    // Error
    { name: 'error', value: Lexer.Tokens.Error },
    // State
    { name: 'has', value: Lexer.Tokens.Has },
    { name: 'set', value: Lexer.Tokens.Set }
  ],
  // Operators
  ...[
    // Unary
    { name: 'not', value: Lexer.Tokens.Not },
    { name: 'opt', value: Lexer.Tokens.Opt },
    { name: 'repeat', value: Lexer.Tokens.Repeat },
    { name: 'map', value: Lexer.Tokens.Map },
    // Node
    { name: 'place', value: Lexer.Tokens.Place },
    { name: 'pivot', value: Lexer.Tokens.Pivot },
    { name: 'append', value: Lexer.Tokens.Append },
    { name: 'prepend', value: Lexer.Tokens.Prepend },
    { name: 'next', value: Lexer.Tokens.Next },
    { name: 'left', value: Lexer.Tokens.Left },
    { name: 'right', value: Lexer.Tokens.Right },
    // Symbol
    { name: 'symbol', value: Lexer.Tokens.Symbol },
    { name: 'scope', value: Lexer.Tokens.Scope },
    // Logical
    { name: 'and', value: Lexer.Tokens.And },
    { name: '&', value: Lexer.Tokens.And },
    { name: 'or', value: Lexer.Tokens.Or },
    { name: '|', value: Lexer.Tokens.Or },
    // Condition
    { name: 'then', value: Lexer.Tokens.Then },
    { name: 'else', value: Lexer.Tokens.Else }
  ],
  // Entry points
  ...[
    { name: 'skip', value: Lexer.Tokens.Skip },
    { name: 'alias', value: Lexer.Tokens.Alias },
    { name: 'token', value: Lexer.Tokens.Token },
    { name: 'node', value: Lexer.Tokens.Node },
    { name: 'as', value: Lexer.Tokens.As }
  ],
  // Syntax symbols
  ...[
    { name: '.', value: Lexer.Tokens.Period },
    { name: ',', value: Lexer.Tokens.Comma },
    { name: ';', value: Lexer.Tokens.Semicolon },
    { name: '{', value: Lexer.Tokens.OpenBraces },
    { name: '}', value: Lexer.Tokens.CloseBraces },
    { name: '(', value: Lexer.Tokens.OpenParenthesis },
    { name: ')', value: Lexer.Tokens.CloseParenthesis },
    { name: '<', value: Lexer.Tokens.OpenChevron },
    { name: '>', value: Lexer.Tokens.CloseChevron }
  ]
];

test('Consume expected tokens', () => {
  const context = new Core.Context('test');
  const text = tokens.map((token) => token.name).join(' ');

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();

  // Check the consumption errors.
  expect(context.errors).toHaveLength(0);

  // For every token, it checks the corresponding value.
  const length = tokens.length;
  for (let index = 0; index < length; ++index) {
    const input = tokens[index].value;
    const output = context.tokens[index].value;
    expect(input).toBe(output);
  }
});

test('Consume unexpected token', () => {
  const context = new Core.Context('test');
  const text = 'any @ any';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeFalsy();

  // Check the consumption tokens (only the first token was consumed).
  expect(context.tokens).toHaveLength(1);

  // Check the consumption errors.
  expect(context.errors).toHaveLength(1);

  const error = context.errors[0];
  expect(error).toBeDefined();
  expect(error.value).toBe(Errors.UNEXPECTED_TOKEN);

  const fragment = error.fragment;
  expect(fragment).toBeDefined();
  expect(fragment.data).toBe('@');
  expect(fragment.begin).toBe(4);
  expect(fragment.end).toBe(5);
  expect(fragment.location.column).toBe(4);
  expect(fragment.location.line).toBe(0);
});

test('Consume unexpected token (empty string)', () => {
  const context = new Core.Context('test');
  const text = "token '' any";

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeFalsy();

  // Check the consumption tokens (only the first token was consumed).
  expect(context.tokens).toHaveLength(1);

  // Check the consumption errors.
  expect(context.errors).toHaveLength(1);

  const error = context.errors[0];
  expect(error).toBeDefined();
  expect(error.value).toBe(Errors.UNEXPECTED_TOKEN);

  const fragment = error.fragment;
  expect(fragment).toBeDefined();
  expect(fragment.data).toBe("'");
  expect(fragment.begin).toBe(6);
  expect(fragment.end).toBe(7);
  expect(fragment.location.column).toBe(6);
  expect(fragment.location.line).toBe(0);
});
