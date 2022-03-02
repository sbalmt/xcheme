import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Output a 'PLACE' pattern", () => {
  const input = "skip place '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(`new Core.PlaceNodePattern(1, new Core.ExpectUnitPattern('@'))`);
});

test("Output a 'PLACE NEXT' pattern", () => {
  const input = "skip place next '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(`new Core.PlaceNodePattern(2, new Core.ExpectUnitPattern('@'))`);
});
