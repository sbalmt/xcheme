import * as Core from '@xcheme/core';
import * as Lexer from '../src/index';

const assert = (text: string): void => {
  const context = new Core.Context('test');

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();

  // Check the consumption results.
  expect(context.errors).toHaveLength(0);
  expect(context.tokens).toHaveLength(0);
};

test('Consume an expected comment line', () => {
  assert('// This is a comment.');
});

test('Consume an expected comment block', () => {
  assert('/* This is a comment. */');
});
