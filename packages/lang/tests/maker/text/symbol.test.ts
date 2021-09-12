import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output a 'SYMBOL' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip symbol '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe("new Core.EmitSymbolPattern(0, new Core.ExpectUnitPattern('@'))");
});

test("Output a chained 'SYMBOL' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip symbol ('@' & repeat '*');");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(
    `new Core.EmitSymbolPattern(0, ` +
      /**/ `new Core.ExpectUnitPattern('@'), ` +
      /**/ `new Core.RepeatFlowPattern(new Core.ExpectUnitPattern('*'))` +
      `)`
  );
});
