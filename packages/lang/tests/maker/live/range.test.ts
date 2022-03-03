import * as Assert from './utils/assert';

test('Parse a range pattern', () => {
  Assert.lexer(
    '0123456789',
    `
    skip from '0' to '9';`
  );
});
