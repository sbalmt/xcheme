import * as Assert from './utils/assert';

test('Parse a RANGE pattern', () => {
  Assert.lexer(
    '0123456789',
    `
    skip from '0' to '9';`
  );
});
