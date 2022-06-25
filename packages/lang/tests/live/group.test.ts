import * as Assert from './utils/assert';

test('Parse a GROUP pattern', () => {
  Assert.lexer(
    '1x2x',
    `
    skip ('1' | '2') & 'x';`
  );
});
