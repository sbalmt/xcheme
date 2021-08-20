import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output subsequent 'OR' rules (simple)", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip '-' | '+' | '@';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(`new Core.ChooseUnitPattern('-', '+', '@')`);
});

test("Output subsequent 'OR' rules (complex)", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip '-' | '+' | '123' | 'abc';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(
    `new Core.ChooseFlowPattern(` +
      /**/ `new Core.ChooseUnitPattern('-', '+'), ` +
      /**/ `new Core.ExpectUnitPattern('1', '2', '3'), ` +
      /**/ `new Core.ExpectUnitPattern('a', 'b', 'c')` +
      `)`
  );
});

test("Output subsequent 'OR' rules (optimized)", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip repeat '-' | '+' | '@' & ('1' | '2') | 'A' | 'B';");

  // Check the output code.
  const rule = project.skipEntries.get('SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.pattern).toBe(
    `new Core.ChooseFlowPattern(` +
      /**/ `new Core.RepeatFlowPattern(new Core.ExpectUnitPattern('-')), ` +
      /**/ `new Core.ChooseUnitPattern('+'), ` +
      /**/ `new Core.ExpectFlowPattern(new Core.ExpectUnitPattern('@'), new Core.ChooseUnitPattern('1', '2')), ` +
      /**/ `new Core.ChooseUnitPattern('A', 'B')` +
      `)`
  );
});
