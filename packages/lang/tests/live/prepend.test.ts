import * as Assert from './utils/assert';

test('Parse a PREPEND pattern', () => {
  Assert.lexer(
    '@@@',
    `
    skip prepend <50> '@';`
  );
});

test('Parse a PREPEND pattern with multiple patterns', () => {
  Assert.lexer(
    '@*',
    `
    skip prepend <50> ('@' | '*');`
  );
});

test('Parse a PREPEND pattern with chained patterns', () => {
  Assert.lexer(
    '@**!',
    `
    skip prepend <50> ('@' & '*' & '*' & opt '!');`
  );
});

test('Parse a PREPEND LEFT pattern', () => {
  Assert.lexer(
    '@@@',
    `
    skip prepend <50> left '@';`
  );
});

test('Parse a PREPEND RIGHT pattern', () => {
  Assert.lexer(
    '@@@',
    `
    skip prepend <50> right '@';`
  );
});

test('Parse a PREPEND NEXT pattern', () => {
  Assert.lexer(
    '@@@',
    `
    skip prepend <50> next '@';`
  );
});
