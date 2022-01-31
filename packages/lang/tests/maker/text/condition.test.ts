import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output a 'THEN' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip '\\\\' then *;");

  // Check the output code.
  const rule = project.local.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.ConditionFlowPattern(new Core.ExpectUnitPattern('\\\\'), new Core.AnyUnitPattern())`);
});

test("Output a 'THEN-ELSE' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip '\\\\' then * else '@';");

  // Check the output code.
  const rule = project.local.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(
    `new Core.ConditionFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern('\\\\'), ` +
      /**/ `new Core.AnyUnitPattern(), ` +
      /**/ `new Core.ExpectUnitPattern('@')` +
      `)`
  );
});
