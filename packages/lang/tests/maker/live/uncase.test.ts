import * as Assert from './utils/assert';

test("Parse an 'UNCASE' pattern", () => {
  Assert.lexer(
    'AaAa',
    `
    skip uncase 'a';`
  );
});
