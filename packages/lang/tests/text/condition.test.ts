import * as Assert from './utils/assert';

test('Output a THEN pattern', () => {
  Assert.output(
    `
    skip '\\\\' then *;`,
    {
      '@SKIP0': `new Core.ConditionFlowPattern(new Core.ExpectUnitPattern('\\\\'), new Core.AnyUnitPattern())`
    }
  );
});

test('Output a THEN/ELSE pattern', () => {
  Assert.output(
    `
    skip '\\\\' then * else '@';`,
    {
      '@SKIP0':
        `new Core.ConditionFlowPattern(` +
        /**/ `new Core.ExpectUnitPattern('\\\\'), ` +
        /**/ `new Core.AnyUnitPattern(), ` +
        /**/ `new Core.ExpectUnitPattern('@')` +
        `)`
    }
  );
});
