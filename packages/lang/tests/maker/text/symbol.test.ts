import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output a 'SYMBOL' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip symbol '@';");

  // Check the output code.
  const rule = project.local.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe("new Core.EmitSymbolPattern(0, new Core.ExpectUnitPattern('@'))");
});

test("Output a 'SYMBOL' rule with chained patterns", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip symbol ('@' & '*' & '*');");

  // Check the output code.
  const rule = project.local.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.EmitSymbolPattern(0, new Core.ExpectUnitPattern('@'), new Core.ExpectUnitPattern('*', '*'))`);
});
