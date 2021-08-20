import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output an 'AND' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip '-' & '+' & '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.ExpectUnitPattern('-', '+', '@')`);
});

test("Output subsequent 'AND' rules (optimized)", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip '-' & '+' & repeat ('@' | 'A') & '1' & '2';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(
    `new Core.ExpectFlowPattern(` +
      /**/ `new Core.ExpectUnitPattern('-', '+'), ` +
      /**/ `new Core.RepeatFlowPattern(new Core.ChooseUnitPattern('@', 'A')), ` +
      /**/ `new Core.ExpectUnitPattern('1', '2')` +
      `)`
  );
});
