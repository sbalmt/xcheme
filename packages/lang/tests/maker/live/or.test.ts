import * as Assert from './utils/assert';

test("Parse an 'OR' pattern", () => {
  Assert.lexer(
    '-+@-+@',
    `
    skip '-' | '+' | '@';`
  );
});

test("Parse an 'OR' pattern optimized with a map", () => {
  Assert.lexer(
    '-123+abc',
    `
    skip '-' | '+' | '123' | 'abc';`
  );
});

test("Parse an 'OR' pattern with a complex sequence", () => {
  Assert.lexer(
    '---+@1AB@2',
    `
    skip repeat '-' | '+' | '@' & ('1' | '2') | 'A' | 'B';`
  );
});
