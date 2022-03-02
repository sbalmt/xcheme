import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Output a 'THEN' pattern", () => {
  const input = "skip '\\\\' then *;";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(
    `new Core.ConditionFlowPattern(new Core.ExpectUnitPattern('\\\\'), new Core.AnyUnitPattern())`
  );
});

test("Output a 'THEN/ELSE' pattern", () => {
  const input = "skip '\\\\' then * else '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(
    `new Core.ConditionFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern('\\\\'), ` +
      /**/ `new Core.AnyUnitPattern(), ` +
      /**/ `new Core.ExpectUnitPattern('@')` +
      `)`
  );
});
