import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test('Output a half condition rule', () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip '\\\\' then *;");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.ConditionFlowPattern(new Core.ExpectUnitPattern('\\\\'), new Core.AnyUnitPattern())`);
});

test('Output a full condition rule', () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip '\\\\' then * else '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(
    `new Core.ConditionFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern('\\\\'), ` +
      /**/ `new Core.AnyUnitPattern(), ` +
      /**/ `new Core.ExpectUnitPattern('@')` +
      `)`
  );
});
