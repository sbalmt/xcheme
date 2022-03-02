import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Output a 'SYMBOL' pattern", () => {
  const input = "skip symbol '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe("new Core.EmitSymbolPattern(0, new Core.ExpectUnitPattern('@'))");
});

test("Output a 'SYMBOL' pattern with chained patterns", () => {
  const input = "skip symbol ('@' & '*' & '*');";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(
    `new Core.EmitSymbolPattern(0, new Core.ExpectUnitPattern('@'), new Core.ExpectUnitPattern('*', '*'))`
  );
});
