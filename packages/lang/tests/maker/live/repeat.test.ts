import * as Assert from './utils/assert';

test("Parse a REPEAT pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip repeat '@';`
  );
});
