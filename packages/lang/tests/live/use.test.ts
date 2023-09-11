import * as Assert from './utils/assert';

test("Parse an USE pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip use <1> '@';`
  );
});
