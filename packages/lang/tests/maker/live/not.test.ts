import * as Assert from './utils/assert';

test("Parse a 'NOT' pattern", () => {
  Assert.lexer(
    '.a0@!',
    `
    skip not '@' then * else '@!';`
  );
});
