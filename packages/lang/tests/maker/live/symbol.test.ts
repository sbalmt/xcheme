import * as Assert from './utils/assert';

test("Parse a 'SYMBOL' pattern", () => {
  Assert.lexer(
    '@',
    `
    skip symbol <50> '@';`
  );
});

test("Parse a 'SYMBOL' pattern with chained patterns", () => {
  Assert.lexer(
    '@**',
    `
    skip symbol <50> ('@' & '*' & '*');`
  );
});
