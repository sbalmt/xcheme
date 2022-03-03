import * as Assert from './utils/assert';

test("Parse a 'PIVOT' pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip pivot '@';`
  );
});

test("Parse a 'PIVOT' pattern with multiple patterns", () => {
  Assert.lexer(
    '@*',
    `
    skip pivot ('@' | '*');`
  );
});

test("Parse a 'PIVOT' pattern with chained patterns", () => {
  Assert.lexer(
    '@**!',
    `
    skip pivot ('@' & '*' & '*' & opt '!');`
  );
});
