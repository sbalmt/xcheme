import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output a 'NOT' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip not '@' then * else '@!';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(
    `new Core.ConditionFlowPattern(` +
      /**/ `new Core.NotFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern('@')` +
      /**/ `), ` +
      /**/ `new Core.AnyUnitPattern(), ` +
      /**/ `new Core.ExpectUnitPattern('@', '!')` +
      `)`
  );
});
