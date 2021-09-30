import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output subsequent 'OR' rules (simple)", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip '-' | '+' | '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.ChooseUnitPattern('-', '+', '@')`);
});

test("Output subsequent 'OR' rules (complex)", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip '-' | '+' | '123' | 'abc';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(
    `new Core.MapFlowPattern(` +
      /**/ `new Core.UnitRoute('-'), ` +
      /**/ `new Core.UnitRoute('+'), ` +
      /**/ `new Core.UnitRoute('1', '2', '3'), ` +
      /**/ `new Core.UnitRoute('a', 'b', 'c')` +
      `)`
  );
});

test("Output subsequent 'OR' rules (optimized)", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip repeat '-' | '+' | '@' & ('1' | '2') | 'A' | 'B';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(
    `new Core.ChooseFlowPattern(` +
      /**/ `new Core.RepeatFlowPattern(new Core.ExpectUnitPattern('-')), ` +
      /**/ `new Core.ExpectUnitPattern('+'), ` +
      /**/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('@'), new Core.ChooseUnitPattern('1', '2')), ` +
      /**/ `new Core.ExpectUnitPattern('A'), ` +
      /**/ `new Core.ExpectUnitPattern('B')` +
      `)`
  );
});
