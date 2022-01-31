import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output an 'OR' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip '-' | '+' | '@';");

  // Check the output code.
  const rule = project.local.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.ChooseUnitPattern('-', '+', '@')`);
});

test("Output an 'OR' rule optimized with a map", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip '-' | '+' | '123' | 'abc';");

  // Check the output code.
  const rule = project.local.get('@SKIP0')!;
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

test("Output an 'OR' rule with a complex sequence", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip repeat '-' | '+' | '@' & ('1' | '2') | 'A' | 'B';");

  // Check the output code.
  const rule = project.local.get('@SKIP0')!;
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
