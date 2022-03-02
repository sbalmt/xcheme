import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Output an 'OR' pattern", () => {
  const input = "skip '-' | '+' | '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(`new Core.ChooseUnitPattern('-', '+', '@')`);
});

test("Output an 'OR' pattern optimized with a map", () => {
  const input = "skip '-' | '+' | '123' | 'abc';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(
    `new Core.MapFlowPattern(` +
      /**/ `new Core.UnitRoute('-'), ` +
      /**/ `new Core.UnitRoute('+'), ` +
      /**/ `new Core.UnitRoute('1', '2', '3'), ` +
      /**/ `new Core.UnitRoute('a', 'b', 'c')` +
      `)`
  );
});

test("Output an 'OR' pattern with a complex sequence", () => {
  const input = "skip repeat '-' | '+' | '@' & ('1' | '2') | 'A' | 'B';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(
    `new Core.ChooseFlowPattern(` +
      /**/ `new Core.RepeatFlowPattern(new Core.ExpectUnitPattern('-')), ` +
      /**/ `new Core.ExpectUnitPattern('+'), ` +
      /**/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('@'), new Core.ChooseUnitPattern('1', '2')), ` +
      /**/ `new Core.ExpectUnitPattern('A'), ` +
      /**/ `new Core.ExpectUnitPattern('B')` +
      `)`
  );
});
