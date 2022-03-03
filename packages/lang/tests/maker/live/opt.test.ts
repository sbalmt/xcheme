import * as Assert from './utils/assert';

test("Parse an 'OPT' pattern", () => {
  Assert.lexer(
    '..@',
    `
    skip '.' & opt '@';`
  );
});
