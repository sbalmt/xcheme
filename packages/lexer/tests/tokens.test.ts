import * as Core from '@xcheme/core';
import * as Lexer from '../src/index';

const tokens = [
  // Operands
  ...[
    // Identifier
    { name: 'NAME', value: Lexer.Tokens.Identifier },
    // Identity or State
    { name: '1234567890', value: Lexer.Tokens.Number },
    // Auto identity
    { name: 'auto', value: Lexer.Tokens.Auto },
    // String
    { name: "'text'", value: Lexer.Tokens.String },
    // Any unit
    { name: 'any', value: Lexer.Tokens.Any },
    // Unit range
    { name: 'from', value: Lexer.Tokens.From },
    { name: 'to', value: Lexer.Tokens.To },
    // Map
    { name: 'map', value: Lexer.Tokens.Map },
    // End of Source
    { name: 'eos', value: Lexer.Tokens.EoS }
  ],
  // Operators
  ...[
    // Condition
    { name: 'then', value: Lexer.Tokens.Then },
    { name: 'else', value: Lexer.Tokens.Else },
    // Logical
    { name: 'or', value: Lexer.Tokens.Or },
    { name: 'and', value: Lexer.Tokens.And },
    // Unary
    { name: 'not', value: Lexer.Tokens.Not },
    { name: 'opt', value: Lexer.Tokens.Opt },
    { name: 'repeat', value: Lexer.Tokens.Repeat },
    // Node
    { name: 'place', value: Lexer.Tokens.Place },
    { name: 'append', value: Lexer.Tokens.Append },
    { name: 'prepend', value: Lexer.Tokens.Prepend },
    { name: 'pivot', value: Lexer.Tokens.Pivot },
    { name: 'next', value: Lexer.Tokens.Next },
    { name: 'left', value: Lexer.Tokens.Left },
    { name: 'right', value: Lexer.Tokens.Right },
    // Symbol
    { name: 'symbol', value: Lexer.Tokens.Symbol },
    { name: 'scope', value: Lexer.Tokens.Scope },
    // Error
    { name: 'error', value: Lexer.Tokens.Error },
    { name: 'warn', value: Lexer.Tokens.Warn },
    // State
    { name: 'has', value: Lexer.Tokens.Has },
    { name: 'set', value: Lexer.Tokens.Set },
    // Transformation
    { name: 'uncase', value: Lexer.Tokens.Uncase },
    // Test
    { name: 'peek', value: Lexer.Tokens.Peek }
  ],
  // Directives
  ...[
    { name: 'skip', value: Lexer.Tokens.Skip },
    { name: 'token', value: Lexer.Tokens.Token },
    { name: 'node', value: Lexer.Tokens.Node },
    { name: 'alias', value: Lexer.Tokens.Alias },
    { name: 'as', value: Lexer.Tokens.As }
  ],
  // Modularization
  ...[
    { name: 'import', value: Lexer.Tokens.Import },
    { name: 'export', value: Lexer.Tokens.Export }
  ],
  // Syntax symbols
  ...[
    { name: '*', value: Lexer.Tokens.Asterisk },
    { name: '&', value: Lexer.Tokens.Ampersand },
    { name: '|', value: Lexer.Tokens.VerticalBar },
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

test('Consume all expected tokens', () => {
  const context = new Core.Context('test');
  const text = tokens.map((token) => token.name).join(' ');

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();

  // Check the consumption errors.
  expect(context.logs).toHaveLength(0);

  // For every token, it checks the corresponding value.
  const length = tokens.length;
  for (let index = 0; index < length; ++index) {
    const input = tokens[index].value;
    const output = context.tokens.get(index).value;
    expect(input).toBe(output);
  }
});

test('Consume an unexpected token', () => {
  const context = new Core.Context('test');
  const text = 'any @ any';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeFalsy();

  // Check the consumption tokens (only the first token was consumed).
  expect(context.tokens).toHaveLength(1);

  // Check the consumption errors.
  expect(context.logs).toHaveLength(1);

  const log = context.logs.get(0);
  expect(log.value).toBe(Lexer.Errors.UNEXPECTED_TOKEN);

  const fragment = log.fragment;
  expect(fragment).toBeDefined();
  expect(fragment.data).toBe('@');
  expect(fragment.begin).toBe(4);
  expect(fragment.end).toBe(5);

  const location = fragment.location;
  expect(location.column.begin).toBe(4);
  expect(location.column.end).toBe(4);
  expect(location.line.begin).toBe(0);
  expect(location.line.end).toBe(0);
});

test('Consume an unexpected token (empty string)', () => {
  const context = new Core.Context('test');
  const text = "token '' any";

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeFalsy();

  // Check the consumption tokens (only the first token was consumed).
  expect(context.tokens).toHaveLength(1);

  // Check the consumption errors.
  expect(context.logs).toHaveLength(1);

  const log = context.logs.get(0);
  expect(log.value).toBe(Lexer.Errors.UNEXPECTED_TOKEN);

  const fragment = log.fragment;
  expect(fragment).toBeDefined();
  expect(fragment.data).toBe("'");
  expect(fragment.begin).toBe(6);
  expect(fragment.end).toBe(7);

  const location = fragment.location;
  expect(location.column.begin).toBe(6);
  expect(location.column.end).toBe(6);
  expect(location.line.begin).toBe(0);
  expect(location.line.end).toBe(0);
});
