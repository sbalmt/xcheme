import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test('Parse a WARN pattern', () => {
  const { context } = Assert.lexer(
    '@',
    `
    skip warn <7575> '@';`
  );
  // Assert warns.
  const warn = context.logs.get(0);
  expect(warn.type).toBe(Core.LogType.WARNING);
  expect(warn.value).toBe(7575);
});
