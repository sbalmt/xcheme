import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output a 'PIVOT' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip pivot '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.PivotNodePattern(0, 1, 0, new Core.ExpectUnitPattern('@'))`);
});

test("Output a chained 'PIVOT' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip pivot ('@' & repeat '*');");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(
    `new Core.PivotNodePattern(0, 1, 0, ` +
      /**/ `new Core.ExpectUnitPattern('@'), ` +
      /**/ `new Core.RepeatFlowPattern(new Core.ExpectUnitPattern('*'))` +
      `)`
  );
});
