import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Output a 'HAS' pattern", () => {
  const input = "skip has <0> '@';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(`new Core.HasStatePattern(0, new Core.ExpectUnitPattern('@'))`);
});
