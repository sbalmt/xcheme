import * as Assert from './utils/assert';

test('Output a NOT pattern', () => {
  Assert.output(
    `
    skip not '@' then * else '@!';`,
    {
      '@SKIP0':
        `new Core.ConditionFlowPattern(` +
        /**/ `new Core.NotFlowPattern(` +
        /******/ `new Core.ExpectUnitPattern('@')` +
        /**/ `), ` +
        /**/ `new Core.AnyUnitPattern(), ` +
        /**/ `new Core.ExpectUnitPattern('@', '!')` +
        `)`
    }
  );
});
