import * as Helper from '../helper';
import * as Lang from '../../../src/index';

test("Output a 'HAS' rule", () => {
  const project = Helper.makeParser(new Lang.TextCoder(), "skip has <0> '@';");

  // Check the output code.
  const rule = project.skipEntries.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.identity).toBe(0);
  expect(rule.pattern).toBe(`new Core.HasStatePattern(0, new Core.ExpectUnitPattern('@'))`);
});
