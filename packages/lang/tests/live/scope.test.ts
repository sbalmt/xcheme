import * as Assert from './utils/assert';

test("Parse a SCOPE pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip scope '@';`
  );
});
