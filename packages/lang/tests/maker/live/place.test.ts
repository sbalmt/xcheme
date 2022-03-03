import * as Assert from './utils/assert';

test("Parse a 'PLACE NEXT' pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip place next '@';`
  );
});

test("Parse a 'PLACE LEFT' pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip place left '@';`
  );
});

test("Parse a 'PLACE RIGHT' pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip place right '@';`
  );
});

test("Parse a 'PLACE' pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip place '@';`
  );
});
