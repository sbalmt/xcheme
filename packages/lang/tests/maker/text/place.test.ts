import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output a 'PLACE' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip place '@';");

  // Check the output code.
  const rule = project.local.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.PlaceNodePattern(1, new Core.ExpectUnitPattern('@'))`);
});

test("Output a 'PLACE NEXT' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip place next '@';");

  // Check the output code.
  const rule = project.local.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.PlaceNodePattern(2, new Core.ExpectUnitPattern('@'))`);
});
