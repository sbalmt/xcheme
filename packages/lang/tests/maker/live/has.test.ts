import * as Assert from './utils/assert';

test("Parse a 'HAS' pattern", () => {
  Assert.lexer(
    '@',
    `
    skip has <0> '@';`
  );
});
