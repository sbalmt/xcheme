import * as Assert from './utils/assert';

test('Parse an ERROR pattern', () => {
  const { context } = Assert.lexer(
    '@',
    `
    skip error <7575> '@';`
  );
  // Assert errors.
  const error = context.errors.get(0);
  expect(error.value).toBe(7575);
});
