import * as Assert from './utils/assert';

test("Parse a 'SKIP' pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip '@';`
  );
});

test("Parse a 'SKIP' pattern with an alias token reference", () => {
  Assert.lexer(
    '@@@',
    `
    skip ALIAS;
    alias token ALIAS as '@';`
  );
});
