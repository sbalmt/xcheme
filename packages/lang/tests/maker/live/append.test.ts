import * as Assert from './utils/assert';

test("Parse an 'APPEND' pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip append '@';`
  );
});

test("Parse an 'APPEND' pattern with multiple patterns", () => {
  Assert.lexer(
    '@*',
    `
    skip append ('@' | '*');`
  );
});

test("Parse an 'APPEND' pattern with chained patterns", () => {
  Assert.lexer(
    '@**!',
    `
    skip append ('@' & '*' & '*' & opt '!');`
  );
});

test("Parse an 'APPEND LEFT' pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip append left '@';`
  );
});

test("Parse an 'APPEND RIGHT' pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip append right '@';`
  );
});

test("Parse an 'APPEND NEXT' pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip append next '@';`
  );
});
