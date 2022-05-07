import * as Assert from './utils/assert';

test('Parse an ANY pattern', () => {
  Assert.lexer(
    '.a0@',
    `
    skip *;`
  );
});
