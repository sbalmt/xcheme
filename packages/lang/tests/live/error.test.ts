import * as Core from '@xcheme/core';

import * as Assert from './utils/assert';

test('Parse an ERROR pattern', () => {
  const { context } = Assert.lexer(
    '@',
    `
    skip error <7575> '@';`
  );
  // Assert errors.
  const error = context.logs.get(0);
  expect(error.type).toBe(Core.LogType.ERROR);
  expect(error.value).toBe(7575);
});
