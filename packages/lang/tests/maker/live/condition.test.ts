import * as Assert from './utils/assert';

test('Parse a THEN pattern', () => {
  Assert.lexer(
    '\\x\\y\\z',
    `
    skip '\\\\' then *;`
  );
});

test('Parse a THEN/ELSE pattern', () => {
  Assert.lexer(
    '\\x\\y@@',
    `
    skip '\\\\' then * else '@';`
  );
});
