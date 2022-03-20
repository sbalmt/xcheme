import * as Assert from './utils/assert';

test("Parse a 'PREPEND' pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip prepend '@';`
  );
});

test("Parse a 'PREPEND' pattern with multiple patterns", () => {
  Assert.lexer(
    '@*',
    `
    skip prepend ('@' | '*');`
  );
});

test("Parse a 'PREPEND' pattern with chained patterns", () => {
  Assert.lexer(
    '@**!',
    `
    skip prepend ('@' & '*' & '*' & opt '!');`
  );
});

test("Parse a 'PREPEND LEFT' pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip prepend left '@';`
  );
});

test("Parse a 'PREPEND RIGHT' pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip prepend right '@';`
  );
});

test("Parse a 'PREPEND NEXT' pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip prepend next '@';`
  );
});
