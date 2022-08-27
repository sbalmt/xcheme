import * as Assert from './utils/assert';

test('Parse an EOS pattern', () => {
  Assert.lexer(
    'x',
    `
    skip 'x' & eos;`
  );
});
