import * as Assert from './utils/assert';

test('Parse an AND pattern', () => {
  Assert.lexer(
    '-+@-+@',
    `
    skip '-' & '+' & '@';`
  );
});

test('Parse an AND pattern with an optimized sequence', () => {
  Assert.lexer(
    '-+@A12-+@@AA12',
    `
    skip '-' & '+' & repeat ('@' | 'A') & '1' & '2';`
  );
});
