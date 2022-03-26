import * as Core from '@xcheme/core';

import { Types, Lexer } from '../../src/index';

test('Consume expected comment', () => {
  const context = new Core.Context<Types.Metadata>('test');
  const text = '// This is a comment.';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();

  // Check the consumption results.
  expect(context.errors).toHaveLength(0);
  expect(context.tokens).toHaveLength(0);
});

test('Consume expected comment block', () => {
  const context = new Core.Context<Types.Metadata>('test');
  const text = '/* This is a comment. */';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();

  // Check the consumption results.
  expect(context.errors).toHaveLength(0);
  expect(context.tokens).toHaveLength(0);
});
