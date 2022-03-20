import * as Assert from './utils/assert';

test("Parse an 'APPEND' pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip append <50> '@';`
  );
});

test("Parse an 'APPEND' pattern with multiple patterns", () => {
  Assert.lexer(
    '@*',
    `
    skip append <50> ('@' | '*');`
  );
});

test("Parse an 'APPEND' pattern with chained patterns", () => {
  Assert.lexer(
    '@**!',
    `
    skip append <50> ('@' & '*' & '*' & opt '!');`
  );
});

test("Parse an 'APPEND LEFT' pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip append <50> left '@';`
  );
});

test("Parse an 'APPEND RIGHT' pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip append <50> right '@';`
  );
});

test("Parse an 'APPEND NEXT' pattern", () => {
  Assert.lexer(
    '@@@',
    `
    skip append <50> next '@';`
  );
});
