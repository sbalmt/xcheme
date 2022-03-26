import * as Core from '@xcheme/core';

import { Types, Lexer } from '../../src/index';

test('Consume expected whites-spaces', () => {
  const context = new Core.Context<Types.Metadata>('test');
  const text = ' \t\v\r\n';

  // Test the consumption.
  expect(Lexer.consumeText(text, context)).toBeTruthy();

  // Check the consumption results.
  expect(context.errors).toHaveLength(0);
  expect(context.tokens).toHaveLength(0);
});
