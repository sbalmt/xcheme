import * as Lang from '../../../src/index';
import * as Helper from '../helper';

test("Output an 'UNCASE' pattern", () => {
  const input = "skip uncase 'A';";
  const project = Helper.makeParser(new Lang.TextCoder(), input);

  // Check the output code.
  const rule = project.symbols.get('@SKIP0')!;
  expect(rule).toBeDefined();
  expect(rule.data.identity).toBe(0);
  expect(rule.data.pattern).toBe(`new Core.UncaseTransformPattern(new Core.ExpectUnitPattern('A'))`);
});
