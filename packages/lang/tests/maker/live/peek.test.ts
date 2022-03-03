import * as Assert from './utils/assert';

test("Parse a 'PEEK' pattern", () => {
  Assert.lexer(
    'ab',
    `
    skip ('a' & peek 'b') & 'b';`
  );
});
