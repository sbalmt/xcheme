import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Output a 'PIVOT' pattern", () => {
  const input = "skip pivot '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(`new Core.PivotNodePattern(0, 1, 0, new Core.ExpectUnitPattern('@'))`);
});

test("Output a 'PIVOT' pattern with multiple patterns", () => {
  const input = "skip pivot ('@' | '*');";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(`new Core.PivotNodePattern(0, 1, 0, new Core.ChooseUnitPattern('@', '*'))`);
});

test("Output a 'PIVOT' pattern with chained patterns", () => {
  const input = "skip pivot ('@' & '*' & '*' & opt '!');";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(
    `new Core.PivotNodePattern(0, 1, 0, ` +
      /**/ `new Core.ExpectUnitPattern('@'), ` +
      /**/ `new Core.ExpectUnitPattern('*', '*'), ` +
      /**/ `new Core.OptFlowPattern(` +
      /******/ `new Core.ExpectUnitPattern('!')` +
      /**/ `)` +
      `)`
  );
});
