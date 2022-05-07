import * as Assert from './utils/assert';

test("Parse a SET pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip set <1> '@';`
  );
});
